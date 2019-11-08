#开发模式
# ssh 到服务器，然后执行build.sh
#scp 回来 dist  这样就可以保证webpack很快 
echo "开始生产环境打包"
webpack --mode development