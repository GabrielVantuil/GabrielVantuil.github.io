#include <iostream>
#include <opencv2/opencv.hpp>

using namespace cv;
using namespace std;

int main(int argc, char** argv){
  Mat image, mask,out;
  int width, height;
  int nobjects=0, nobj_buraco=0;
  int r=0,g=0,b=0;

  CvPoint p;
  

  image = imread(argv[1],CV_LOAD_IMAGE_GRAYSCALE);
  cvtColor(image, out, CV_GRAY2RGB);
  if(!image.data)
    cout << "nao abriu " <<argv[1]<< endl;

  width=image.size().width;
  height=image.size().height;


  p.x=0;
  p.y=0;
  
//--------------------------- limpa bordas
  for(int i=0; i<height; i++)
    if( (out.at<Vec3b>(i,0)[0] == 255)&&
        (out.at<Vec3b>(i,0)[1] == 255)&&
        (out.at<Vec3b>(i,0)[2] == 255)
        ||
        (out.at<Vec3b>(i,0)[0] == 255)&&
        (out.at<Vec3b>(i,0)[1] == 255)&&
        (out.at<Vec3b>(i,0)[2] == 255)){  
          p.x=0;
          p.y=i;
          floodFill(out,p,CV_RGB(0,0,0)); 
        }
  for(int j=0; j<width; j++)
    if( (out.at<Vec3b>(0,j)[0] == 255)&&
        (out.at<Vec3b>(0,j)[1] == 255)&&
        (out.at<Vec3b>(0,j)[2] == 255)
        ||
        (out.at<Vec3b>(0,j)[0] == 255)&&
        (out.at<Vec3b>(0,j)[1] == 255)&&
        (out.at<Vec3b>(0,j)[2] == 255)){  
          p.x=j;
          p.y=0;
          floodFill(out,p,CV_RGB(0,0,0)); 
        }
//---------------------------
		

  nobjects=0;
  for(int i=0; i<height; i++)
    for(int j=0; j<width; j++)
      if( (out.at<Vec3b>(i,j)[0] == 255)&&
          (out.at<Vec3b>(i,j)[1] == 255)&&
          (out.at<Vec3b>(i,j)[2] == 255)){
            p.x=j;
            p.y=i;
            nobjects++;
            r= nobjects%255;
            g=(nobjects/255)%255;
            b= nobjects/(255*255);
            floodFill(out,p,CV_RGB(r,g,b));//todos obj
          }
  p.x=0;
  p.y=0;
  floodFill(out,p,CV_RGB(100,100,100));//fundo

  for(int i=0; i<height; i++)
    for(int j=0; j<width; j++)
      if( (out.at<Vec3b>(i,j)[0] == 0)&&
          (out.at<Vec3b>(i,j)[1] == 0)&&
          (out.at<Vec3b>(i,j)[2] == 0)){
            p.x=j;
            p.y=i;
            floodFill(out,p,CV_RGB(254,254,254));//buracos dentro de objetos 
            nobj_buraco++;
          }
	
  cout<<"\nObjetos sem buracos "<<nobjects-nobj_buraco<<endl;
  cout<<"\nObjetos com buracos "<<nobj_buraco<<endl;
  imshow("image", image);
  waitKey();
  imshow("saida", out);
  waitKey();
  return 0;
}
