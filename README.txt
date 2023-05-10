This original thesis/code submission was originally uploaded to my own github page before the deadline had passed.

Running the application:
	
	Open terminal window on MovieBase/MovieBaseFrontend/client folder and run 'npm install'
		Once npm is installed, run 'npm run start' - React runs
	Open terminal window on MovieBase/MovieBaseBackend folder and run 'npm install'
		Once npm is installed, run 'npm run dev'  - Express server runs

	**Python must be installed**
		Open terminal window on MovieBase/MovieBaseFrontend folder and run 'pipenv install --python 3.9'
			Then run 'pipenv install' to install all dependencies from the pipfile
				Then run 'pipenv shell' to start a virtual environment
					Then run 'flask run' to start the flask server


Python files:
	
	IMDbTestExport.ipynb = Iinitial attempt to run the original datasets, but they were too large to run
	IMDb_Movies_Trim.ipynb = Trimming the movies dataset by filtering out movies with less than x ratings 
	IMDbTestExportSmall.ipynb = Combining a trimmed movie dataset to be exported and used by the AI model in app
	AsInApp.ipynb = The python code structured as in the application, for testing purposes
	Functional Testing.ipynb = Testing trimming the users dataset by dropping users who have provided less than x ratings
	Functional Testing 2.ipynb = Trimming and exporting multiple versions of user dataset
	Functional Testing 3.ipynb = Combining every version of the trimmed movie dataset with every version of the trimmed user dataset
	Functional Testing 4.ipynb = Running the application code on every combination of datasets (one at a time, just change the import file name at the beginning)

	* The datasets themselves are too large and too numerous to include

	The original datasets can be retrieved from:
	
	IMDb's official datasets: https://datasets.imdbws.com/
	Unofficial user rating (on IMDb) dataset: https://ieee-dataport.org/open-access/imdb-users-ratings-dataset

	


Log.docx = A semi organised personal log used throughout the project. Some things were removed as I didn't need them anymore and I wasn't originally intending to submit this, and not everything that I did was logged, but a lot was.


