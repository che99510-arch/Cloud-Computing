@echo off
echo === Step 1: Build React frontend ===
cd frontend
call npm run build
cd ..

echo === Step 2: Copy frontend build into backend ===
if exist backend\frontend_dist rmdir /s /q backend\frontend_dist
xcopy /E /I frontend\dist backend\frontend_dist

echo === Step 3: Collect Django static files ===
cd backend
call venv\Scripts\activate
python manage.py collectstatic --noinput
python manage.py migrate --noinput

echo === Step 4: Deploy to Google App Engine ===
gcloud app deploy app.yaml --quiet

echo === Done! Opening app... ===
gcloud app browse
cd ..
