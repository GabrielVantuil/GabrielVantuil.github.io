#include <iostream>
#include <opencv2/opencv.hpp>

using namespace cv;
using namespace std;

int main(int argc, char** argv){
  Mat image;
  int width, height;
  VideoCapture cap;
  vector<Mat> planes;
  Mat histR, hist_ant;
  int nbins = 64;
  float range[] = {0, 256};
  const float *histrange = { range };
  bool uniform = true;
  bool acummulate = false;

  cap.open(0);

  if(!cap.isOpened()){
    cout << "cameras indisponiveis";
    return -1;
  }

  width  = cap.get(CV_CAP_PROP_FRAME_WIDTH);
  height = cap.get(CV_CAP_PROP_FRAME_HEIGHT);

  cout << "largura = " << width << endl;
  cout << "altura  = " << height << endl;

  cap >> image;
  split (image, planes);

  calcHist(&planes[0], 1, 0, Mat(), hist_ant, 1,
           &nbins, &histrange,
           uniform, acummulate);
  while(1){
    cap >> image;
    split (image, planes);

    calcHist(&planes[0], 1, 0, Mat(), histR, 1,
             &nbins, &histrange,
             uniform, acummulate);

    int sad = 0;
    for(int i=0; i<nbins; i++)
      sad += abs(histR.at<float>(i) - hist_ant.at<float>(i));
    
    if(sad > 30000)
      cout << "moveu "<<sad <<endl;
    
    hist_ant = histR.clone();

   // imshow("image", image);
    if(waitKey(30) >= 0) break;
  }
  return 0;
}