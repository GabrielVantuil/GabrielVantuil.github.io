#include <iostream>
#include <opencv2/opencv.hpp>
#include <cstdlib>

using namespace cv;
using namespace std;

int main( int argc, char** argv ){
    Mat img = imread( argv[1], CV_LOAD_IMAGE_COLOR);
    Mat img2 = imread( argv[2], CV_LOAD_IMAGE_COLOR);
    Mat teste = img - img2;
    imshow("teste",teste);
    waitKey(0);



}