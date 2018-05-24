#include <iostream>
#include <opencv2/opencv.hpp>
#include <fstream>
#include <iomanip>
#include <vector>
#include <algorithm>
#include <numeric>
#include <ctime>
#include <cstdlib>

using namespace std;
using namespace cv;

#define STEP 3
#define JITTER 5
#define JITTER_b 2
#define RAIO 4
#define RAIO_borda 4

#define top_slider_max 200

int top_slider = 200;
int width, height;

char TrackbarName[50];

Mat image, points, border;

void points_borda(){
  int gray,x,y;
  for(int i = JITTER_b; i < border.size().width - JITTER_b; i++){
    for(int j = JITTER_b; j < border.size().height - JITTER_b; j++){
      if(border.at<uchar>(j,i) == 255){
        y = i + rand()%(2*JITTER_b) - JITTER_b + 1;
        x = j + rand()%(2*JITTER_b) - JITTER_b + 1;
        gray = image.at<uchar>(x,y);
        circle(points,
              cv::Point(y,x),
              RAIO_borda,
              CV_RGB(gray,gray,gray),
              -1,
              CV_AA);
      }
    }
  }
}

void pontilhismo(){
  vector<int> yrange;
  vector<int> xrange;

  int gray;
  int x, y;
  
  srand(time(0));

  width=image.size().width;
  height=image.size().height;

  xrange.resize(height/STEP);
  yrange.resize(width/STEP);

  iota(xrange.begin(), xrange.end(), 0);
  iota(yrange.begin(), yrange.end(), 0);

  for(uint i=0; i<xrange.size(); i++)
    xrange[i]= xrange[i]*STEP+STEP/2;

  for(uint i=0; i<yrange.size(); i++)
    yrange[i]= yrange[i]*STEP+STEP/2;
  points = Mat(height, width, CV_8U, Scalar(255));

  random_shuffle(xrange.begin(), xrange.end());

  for(auto i : xrange){
    random_shuffle(yrange.begin(), yrange.end());
    for(auto j : yrange){
      x = i+rand()%(2*JITTER)-JITTER+1;
      y = j+rand()%(2*JITTER)-JITTER+1;
      gray = image.at<uchar>(x,y);
      circle(points,
             cv::Point(y,x),
             RAIO,
             CV_RGB(gray,gray,gray),
             -1,
             CV_AA);
    }
  }
}


void on_trackbar_canny(int, void*){
  //pontilhismo();
  Canny(image, border, top_slider, 3*top_slider);
  points_borda();
  imshow("border", border);
  imshow("canny", points);
}
void on_trackbar_raio(int, void*){}


int main(int argc, char** argv){


  image = imread(argv[1],CV_LOAD_IMAGE_GRAYSCALE);

  if(!image.data){
	cout << "nao abriu: " << argv[1] << endl;
    cout << argv[0] << " imagem.jpg";
    exit(0);
  }

  pontilhismo();

  sprintf( TrackbarName, "Threshold inferior", top_slider_max );
  namedWindow("canny",1);
  createTrackbar( TrackbarName, "canny",
                &top_slider,
                top_slider_max,
                on_trackbar_canny );

  on_trackbar_canny(top_slider, 0 );

  waitKey(0);

  imwrite("canny.jpg", border);    
  imwrite("final.jpg", points);

  return 0;
}