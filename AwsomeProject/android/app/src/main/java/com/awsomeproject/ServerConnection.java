package com.awsomeproject;


import android.util.Log;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.SocketTimeoutException;
import java.net.URL;

/**
 * Created by hasher on 5/8/16.
 */
public class ServerConnection extends ReactContextBaseJavaModule {

    public ServerConnection(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "Server";
    }

    @ReactMethod
    public void requestUrl(String url, String postParameters, Callback successCallback) {
        HttpURLConnection urlConnection = null;
        try {
            // create connection
            URL urlToRequest = new URL(url);
            urlConnection = (HttpURLConnection) urlToRequest.openConnection();

            // handle POST parameters
            if (postParameters != null) {
                Log.d("ReactNative", "chk1");

                urlConnection.setDoOutput(true);
                urlConnection.setRequestMethod("POST");
                urlConnection.setFixedLengthStreamingMode(
                        postParameters.getBytes().length);
                urlConnection.setRequestProperty("Content-Type",
                        "application/json");

                //send the POST out
                PrintWriter out = new PrintWriter(urlConnection.getOutputStream());
                out.print(postParameters);
                out.close();
            }
            Log.d("ReactNative", "chk2");
            // handle issues
            int statusCode = urlConnection.getResponseCode();
            Log.d("ReactNative", " " + urlConnection.getResponseMessage());

            if (statusCode != HttpURLConnection.HTTP_OK) {
                // throw some exception
            }

            InputStream in = new BufferedInputStream(urlConnection.getInputStream());
            successCallback.invoke(getStringFromInputStream(in));

        } catch (MalformedURLException e) {
            Log.e("ReactNative", e.getMessage());
            // handle invalid URL
        } catch (SocketTimeoutException e) {
            Log.e("ReactNative", e.getMessage());
            // hadle timeout
        } catch (ProtocolException e) {
            e.printStackTrace();
            Log.e("ReactNative", e.getMessage());
        } catch (IOException e) {
            Log.e("ReactNative", e.getMessage());
            // handle I/0
        } finally {
            if (urlConnection != null) {

                urlConnection.disconnect();
            }
        }

    }
    // convert InputStream to String
    private static String getStringFromInputStream(InputStream is) {

        BufferedReader br = null;
        StringBuilder sb = new StringBuilder();

        String line;
        try {

            br = new BufferedReader(new InputStreamReader(is));
            while ((line = br.readLine()) != null) {
                sb.append(line);
            }

        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (br != null) {
                try {
                    br.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

        return sb.toString();

    }

}
