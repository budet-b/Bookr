#install.sh
echo 'Creation of the database 🚚'

{
pg_ctl start
psql postgres -c "DROP DATABASE IF EXISTS bookr"
psql postgres -c "CREATE DATABASE bookr"
psql bookr -a -f ./db/init_db.sql
psql bookr -a -f ./db/datas.sql
} &> /dev/null


echo 'Installation of dependecies 📦'

{
cd api
npm install
} &> /dev/null

if [ $? -eq 0 ]; then
cd api
echo 'Everything seems to be fine! ✅'
echo 'Now you can do :'
echo '- cd api'
echo '- npm start to launch the project'
else
echo 'An error occured ❌'
fi
