from flask import Flask, render_template, request, send_file
import numpy as np
import tensorflow as tf
from keras.models import Model, load_model
from scipy import signal
import os
from datetime import datetime
import scipy.io.wavfile


app = Flask('__name__')


@app.after_request
def add_header(response):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also to cache the rendered page for 10 minutes.
    """
    response.headers['Cache-Control'] = 'public, max-age=0'
    return response

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/inferz', methods=['GET'])
def inferz():
    path_to_file = "test.wav"
    return send_file(
         path_to_file,
         mimetype="audio/wav",
         as_attachment=True,
         attachment_filename="test.wav")


@app.route('/infer', methods=['GET'])
def infer():
    CHUNK = int(1024)

    mag_scales = request.args.getlist('scales[]')
    print(mag_scales[0])

    data_path = os.path.join(os.getcwd(),'models/all_frames_trained_decoder.h5')
    decoder = load_model(data_path, compile=False)
    decoder._make_predict_function()
    dec_graph = tf.get_default_graph()
    wn_phase = np.load('models/1000_small_phase.npy')

    temp_scales = np.ones(15)
    for w in range(15):
        temp_scales[w]=int(mag_scales[w])/10.
    scales = temp_scales

    # ind_array = np.arange((999),(999*(2)))
    temp_phase = wn_phase
    enc_mag = scales*np.ones((1,15))

    with dec_graph.as_default():
        temp_out_mag = decoder.predict(enc_mag)
    temp_out_mag = np.tile(temp_out_mag,(1000,1))
    E = temp_out_mag*np.exp(1j*temp_phase)
    _, now_out = signal.istft(E.T, fs=44100, noverlap=3*1024, nfft=4096)
    out = np.float32(now_out[3*CHUNK:]*(0.08/np.max(np.abs(now_out)))) #output array here

    # figure out to return a file object
    # buf = sf.write('rendered.wav', out, 44100, subtype='PCM_16')
    scipy.io.wavfile.write('rendered.wav',44100,out)

    path_to_file = "rendered.wav"
    print('done rendering')


    return send_file(
         path_to_file,
         mimetype="audio/wav",
         as_attachment=True,
         attachment_filename="rendered.wav")

if __name__ == '__main__':
    # Bind to PORT if defined, otherwise default to 5000.
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
