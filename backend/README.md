# Backend

### `Technologies:`

`NodeJs` `Express` `Sequelize` `Minio`

### `to start the app:`

you need to create folder certs with files: cert.pem, key.pem (ssl)
```
docker build . -t backend 
kubectl apply -f deployment-db.yaml
helm install minio --set resources.requests.memory=512Mi --set replicas=1 --set persistence.enabled=false --set mode=standalone --set rootUser=rootuser,rootPassword=rootpass123 minio/minio
kubectl apply -f deployment.yaml
```
### `privacy:`

`OAuth2.1` `Unique AES key for each token` `Desentralisation of tokens`
`Argon2` `Winston logger` `Helmet` `Safe-buffer` `Express Rate Limit`
