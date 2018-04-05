#include <iostream>
#include <opencv2/opencv.hpp>

using namespace cv;
using namespace std;

int main(int argc , char** argv){
  Mat image, trocada;
  Vec3b val;

  image= imread(argv[1],CV_LOAD_IMAGE_GRAYSCALE);
  if(!image.data)
    cout << "nao abriu " <<argv[1]<< endl;
  
  trocada = image.clone();
  int width = image.cols;
  int height = image.rows;

  namedWindow("janela",WINDOW_AUTOSIZE);

  for(int i=0;i<height/2;i++)
    for(int j=0;j<width/2;j++)
      trocada.at<uchar>(i,j)=image.at<uchar>(i+height/2,j+width/2);

  for(int i=0;i<height/2;i++)
    for(int j=width/2;j<width;j++)
      trocada.at<uchar>(i,j)=image.at<uchar>(i+height/2,j-width/2);
  
  for(int i=height/2;i<height;i++)
    for(int j=0;j<width/2;j++)
      trocada.at<uchar>(i,j)=image.at<uchar>(i-height/2,j+width/2);

  for(int i=height/2;i<height;i++)
    for(int j=width/2;j<width;j++)
      trocada.at<uchar>(i,j)=image.at<uchar>(i-height/2,j-width/2);

  
  
  imshow("janela", trocada);  
  waitKey();
  return 0;
}
