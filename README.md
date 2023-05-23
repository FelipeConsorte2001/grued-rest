# System to manage products and product category

## Summary

<p>The product and category management application is a technological solution that aims to offer users the possibility to search and purchase Automotive, IT, and Furniture products. The idea is to create a platform that allows both users to search and quote for their product, making the process more efficient and intuitiv</p>


## Technologies used 

* Typescripty v*
* Prisma v4.14
* Postgres v8.14.0
* Docker
* Jest v29.5.0

# How to execute the project

## First you must have the following tools installed 
*  <a href="https://nodejs.org/en/download">Node</a> 
*  <a href="https://www.docker.com/products/docker-desktop">Docker</a> 
*  <a href="https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable">yarn</a> 
*  <a href="https://code.visualstudio.com/download">Visual Studio Code</a> 

## Steps to execute the project 

1.  First you must clone the repository using the following command:
  `git clone https://github.com/FelipeConsorte2001/grued-rest.git`

2. Open this folder in the visual studio you just downloaded

3.  Open the terminal

4.  Run the command: `yarn` to install the dependencies

5. You should rename the file `.env_example` to `.env` 

## Now we need to run the database 

6. Run the command: `docker composer up` up to upload a postgres container

## To run the tests 

7. Open a new terminal tab and run the command: `yarn secure-mode` this command will run jest that will perform all unit tests 

## To run the API 

8. Just run the command: `yarn dev` this command will run nodemon and allow you to make the request following the <a href="https://felipe.stoplight.io/docs/grud-gen/rxpa9m6mqpji8-product-control-system">docomentation</a> 
