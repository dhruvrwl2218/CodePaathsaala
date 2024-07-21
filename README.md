# OnlineCourseApp
This is online Course App where where the user can enroll in any Course and get access to that Course ,This Project has all the auth functionality. More things are to be added...


IN this new branch we resolving some of the major issue we are facing in production and trying to improve the performance 

1> forget pass and reset pass thing was working fine but it was in another branch tht was deleted and these changes were not added here so need a fix
issue(link is getting but while reset req is sent 200 fake response is generated and while trying to log in again getting error for icoorect pass)
2> **** Then in production cookies are recieved but while making the calls to the protected routes server is not recieving the cookies (seems to be fixed)
3> then read about the other things to be care about while using the https and in production
4> Need to improve the initial loading time by splitting the code by adding the lazy loading and suspense so that it does'nt take much time to load the website when user enters
5> Read and try to fix the issue where design of the website looks diff in the browser like in dev also it was fine with the chrome but in edge there were slight diff but after hosting it edge seems to be too small and weird .(chrome 100% === edge 125% {still looks weird after this})
6> try to improve the api response by deleting the complexity of the obj sent by the api(my axious inteceptor)
7> additionally add the zod validation to the form where needed so that unwanted behaviour is not caused by the user 
8>while adding the files in prodiction server is not able to find the files in the local direcotory so we need to upload it as it is to the cloudinary ,(impo****)
9> in the header while we change to the small screen to big screen and nav links are shown with toggle bar then it distrupting the behaviour of thr design 
10> Pdfs are not been some in the pro. and videos are needed to be checked (may be due to the 3rd party cookies sent by the cloudinary)~~~~~~~~now working fine (in case of the single course in the crousel it not working fine)
11> add the after effects on the client side after you have performed the any of the action and remember to dlt the cloudinary images and files for which the course has been deleted or in case of any error after cloud activity need to delete the file .


cloudinary.uploader.destroy('public_id_of_file', (error, result) => {
  if (error) {
    console.error('Error deleting file:', error);
  } else {
    console.log('File deleted successfully:', result);
  }
});


#User-side pages

![home page](https://github.com/dhruvrwl2218/CodePaathsaala/assets/162804817/140a9d8c-95c6-4f6e-b0f8-7e5d6ab8aed7)
![Course Page](https://github.com/dhruvrwl2218/CodePaathsaala/assets/162804817/b110ca4a-7abc-4e0d-abb4-716e6b30cdae)
![purchased courses](https://github.com/dhruvrwl2218/CodePaathsaala/assets/162804817/93ae969e-5518-4c90-bfa3-000bc265a097)
![videos in lec](https://github.com/dhruvrwl2218/CodePaathsaala/assets/162804817/a12c6503-44fa-4161-8727-b597cfa2d4e6)
![ISSUE PAGE](https://github.com/user-attachments/assets/28b57416-6f55-4821-86c1-5b29314244f5)



#admin side pages

![ListedCourses](https://github.com/dhruvrwl2218/CodePaathsaala/assets/162804817/4ce0a9e6-61a6-4f50-8527-16ce1647aaf9)
![EnrolledUser](https://github.com/dhruvrwl2218/CodePaathsaala/assets/162804817/b0421458-b5ba-488f-8edd-8a8f0e8492f1)
![addcourses](https://github.com/dhruvrwl2218/CodePaathsaala/assets/162804817/da8d981e-73af-4e10-97df-75bc84270363)
