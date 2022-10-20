1. Setup virtual environment

cd api
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

2. Setup database
python3 utils/database_init.py

3. Install node packages
If you haven't already: npm install -g yarn
cd ..
yarn install

4. To start the react frontend and flask backend:
yarn start
yarn start-api