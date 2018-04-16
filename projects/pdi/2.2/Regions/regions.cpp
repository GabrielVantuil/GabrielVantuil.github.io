#include <iostream>
#include <opencv2/opencv.hpp>

using namespace cv;
using namespace std;

int main(int argc , char** argv){
  Mat image;
  int x1,y1,x2,y2;
  
  image= imread(argv[1],CV_LOAD_IMAGE_GRAYSCALE);
  if(!image.data)
    cout << "nao abriu " <<argv[1]<< endl;

  cout<<"Ponto 1 x: ";
  cin>>x1;
  cout<<"Ponto 1 y: ";
  cin>>y1;
  
  cout<<"Ponto 2 x: ";
  cin>>x2;
  cout<<"Ponto 2 y: ";
  cin>>y2;
  
  namedWindow("janela",WINDOW_AUTOSIZE);

  for(int i=x1;i<x2;i++){
    for(int j=y1;j<y2;j++){
      image.at<uchar>(i,j)=255-image.at<uchar>(i,j);
    }
  }
  
  imshow("janela", image);  
  imwrite("resultado.png", image);
  waitKey();
  return 0;
}
