package com.tipitopsinc.faroshgah;
import android.os.Bundle;
import org.devio.rn.splashscreen.SplashScreen;
import com.facebook.react.ReactActivity;
import com.devfd.RNGeocoder.RNGeocoderPackage;
public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected void onCreate(Bundle savedInstanceState) {
      SplashScreen.show(this);  // here
      super.onCreate(savedInstanceState);
  }

  @Override
  protected String getMainComponentName() {
    return "tipi_mobile_app";
  }
}