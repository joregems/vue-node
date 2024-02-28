#init sh
set -e
echo <<EOF
echo 'VITE_API_URL=$SEVER_HOST' > .env.development
echo 'VITE_FRONT_URL=$FRONT_HOST' >> .env.development
EOF