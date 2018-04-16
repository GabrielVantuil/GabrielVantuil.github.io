#include <iostream>
#include <opencv2/opencv.hpp>

using namespace cv;
using namespace std;

int main(int argc, char** argv){
  Mat image, mask,out;
  int width, height;
  int nobjects;
  int r=0,g=0,b=0;

  CvPoint p;
  
  if(!image.data)
    cout << "nao abriu " <<argv[1]<< endl;

  image = imread(argv[1],CV_LOAD_IMAGE_GRAYSCALE);
  cvtColor(image, out, CV_GRAY2RGB);

  width=image.size().width;
  height=image.size().height;


  p.x=0;
  p.y=0;

  // busca objetos com buracos presentes
  nobjects=0;
  for(int i=0; i<height; i++){
    for(int j=0; j<width; j++){
      if( (out.at<Vec3b>(i,j)[0] == 255)&&
          (out.at<Vec3b>(i,j)[1] == 255)&&
          (out.at<Vec3b>(i,j)[2] == 255)){
		// achou um objeto
		nobjects++;
    
		p.x=j;
		p.y=i;
    r= nobjects%255;
    g=(nobjects/255)%255;
    b= nobjects/(255*255);


		floodFill(out,p,CV_RGB(r,g,b));
	  }
	}
  }
  imshow("image", image);
  waitKey();
  imshow("saida", out);
  
  imwrite("resultado.png",out);
  waitKey();
  return 0;
}
