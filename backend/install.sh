#install.sh
echo 'Creation of the database 🚚'

{
pg_ctl start
psql postgres -a -f ./db/init_db.sql
psql postgres -a -f ./db/datas.sql
} &> /dev/null


echo 'Installation of dependecies 📦'

{
cd api
npm install
} &> /dev/null

if [ $? -eq 0 ]; then
echo 'Everything seems to be fine! ✅'
echo 'Now you can do npm start to launch the project'
else
echo 'An error occured ❌'
fi
