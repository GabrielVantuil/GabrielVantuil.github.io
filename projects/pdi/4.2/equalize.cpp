#include <iostream>
#include <opencv2/opencv.hpp>

using namespace cv;
using namespace std;

int main(int argc, char** argv){
  Mat image, equalizada;
  VideoCapture cap;

  cap.open(0);

  if(!cap.isOpened()){
    cout << "cameras indisponiveis";
    return -1;
  }

  while(1){
    cap >> image;

    cvtColor( image, image, CV_BGR2GRAY );
    equalizeHist( image, equalizada );
    imshow( "Equalizada", equalizada );

    if(waitKey(30) >= 0) break;
  }
  
  imwrite("Original.png",image);
  imwrite("Equalizada.png", equalizada);

  return 0;
}