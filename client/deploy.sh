echo "Switching to the main branch"
git checkout main

echo "Building App..."
npm run build

echo "Deploying File to the Server..."
scp -r ./build/* tanishq@143.244.132.249:/var/www/143.244.132.249/

echo "Deployed Successfully"