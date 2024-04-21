# todolist

## 開發流程

### branch 取名

開頭註明 branch 的意圖

 - 功能開發：`feature/`
 - 修正問題：`bugfix/`

作業內容用`-`來分隔

例子
```
feature/get-todo
```

### .env 範例

範例一

```
DATABASE=mongodb://127.0.0.1:27017/db
```

範例二

```
DATABASE=mongodb://username:<password>@host:port/db?options...  # <password> 照著打，程式執行時會被下者取代
DATABASE_PASSWORD=my_password
```
