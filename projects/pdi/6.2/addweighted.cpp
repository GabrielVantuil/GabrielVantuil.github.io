#include <iostream>
#include <opencv2/opencv.hpp>

using namespace cv;
using namespace std;

double alfa;
int altura_slider = 0;
int altura_slider_max = 100;

int borramento_slider = 0;
int borramento_slider_max = 100;

int c_vert_slider = 0;
int c_vert_slider_max = 100;

Mat image1, image2, blended;
Mat imageTop; 

char TrackbarName[50];

void on_trackbar_blend(int, void*){
 alfa = (double) altura_slider/altura_slider_max ;
 addWeighted( image1, alfa, imageTop, 1-alfa, 0.0, blended);
 imshow("addweighted", blended);
}

void on_trackbar_line(int, void*){
  image1.copyTo(imageTop);
  int limit = borramento_slider*255/100;
  if(limit > 0){
	Mat tmp = image2(Rect(0, 0, 256, limit));
	tmp.copyTo(imageTop(Rect(0, 0, 256, limit)));
  }
  on_trackbar_blend(altura_slider,0);
}

int main(int argvc, char** argv){
  image1 = imread("blend1.jpg");
  image2 = imread("blend2.jpg");
  image2.copyTo(imageTop);
  namedWindow("addweighted", 1);
  
  sprintf( TrackbarName, "altura %d", altura_slider_max );
  createTrackbar( TrackbarName, "addweighted",
				  &altura_slider,
				  altura_slider_max,
				  on_trackbar_blend );
  on_trackbar_blend(altura_slider, 0 );
  
  sprintf( TrackbarName, "Borramento %d", borramento_slider_max );
  createTrackbar( TrackbarName, "addweighted",
				  &borramento_slider,
				  borramento_slider_max,
				  on_trackbar_line);
  on_trackbar_line(borramento_slider, 0 );

  sprintf( TrackbarName, "centro vertical %d", c_vert_slider_max );
  createTrackbar( TrackbarName, "addweighted",
				  &c_vert_slider,
				  c_vert_slider_max,
				  on_trackbar_line);
  on_trackbar_line(c_vert_slider, 0 );

  waitKey(0);
  return 0;
}
