# Rest-api-challenge

Yazdığım bu rest apinin 4 özelliği bulunmaktadır.
Express.js ile yazılmıştır.
Veritabanı olarak ise mongoDB kullanılmıştır.

1-Post işlemi:
Bu işlemde kullanıcıdan belli parametreler alınır bunlar username ve message değerleridir.
Username değeri headers dan message ise body dan alınır.
Message değerinde hashtag içeren bir kelime varsa post işlemi sırasında veritabanında tags denen bir değere atanır 

2-Delete işlemi:
Url'den gelen id değerine göre veritabanında bulunan kayıdı arar.Eğer böyle bir kayıt varsa headersdan gelen username değeri ile veritabanı kayıdında bulunan username değeriyle karşılaştırır.İki değer aynı ise kayıdı siler eğer aynı değillerse status 204 gönderir.


3-Get işlemi:Url'den gelen id değerine göre veritabanında bulunan kayıdı kullanıcıya döndürür.

4-Get işlemi (Filtreleme özelliğine sahip):
Url üzerinden belli başlı birkaç query değeri girilir.Bu query değerleri sırası ile tag,username,page ve count dur.
tag:Bu değer verildiğinde kullanıcıya döndürülcek bütün mesajlarda tag değeri bulunmalıdır.
username:Bu isteğe bağlı bi değerdir eğer verilirse  üstteki koşulu sağlayan kayıtlardan username değerine sahip olanları sadece döndürür.
count:Bu parametre default olarak 10 dur bu parametre döndürülcek kayıt sayısını belirler.
