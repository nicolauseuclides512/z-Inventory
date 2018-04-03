<template>
  <div>

    <div v-if="showTerms" class="modal" tabindex="-1" role="dialog" style="display: block; left: 0; background: rgba(0, 0, 0, 0.8);">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" @click="toggleTermsModal" data-dismiss="modal" aria-label="Close"><span
              aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">Terms and Conditions</h4>
          </div>
          <div class="modal-body">
            <p>
              Syarat-syarat ini mengikat dan mulai berlaku untuk Anda saat Anda mulai
              mengakses layanan apapun dari Zuragan.
            </p>
            <p>
              Layanan Zuragan dapat berubah dari waktu ke waktu berdasarkan kesan &amp;
              saran dari pengguna. Syarat-syarat ini tidak dimaksudkan untuk menjawab
              setiap pertanyaan atau menunjukkan setiap masalah yang dapat timbul dari
              penggunaan layanan Zuragan. Zuragan berhak untuk mengubah Syarat &amp;
              Ketentuan ini kapan saja, dan mulai berlaku pada saat Syarat &amp;
              Ketentuan yang baru atau yang telah direvisi di lampirkan di Website
              Zuragan. Zuragan akan berusaha untuk mengumumkan perubahan-perubahannya
              kepada Anda melalui email atau pemberitahuan melalui Website. Karena cukup
              memungkinan bahwa Syarat &amp; Ketentuan ini akan berubah dari waktu ke
              waktu, maka menjadi kewajiban Anda untuk memastikan bahwa Anda sudah
              membaca, mengerti, dan menyetujui Syarat &amp; Ketentuan terbaru yang
              tersedia pada Website Zuragan.
            </p>
            <p>
              Dengan mendaftarkan diri untuk menggunakan layanan Zuragan, Anda menyatakan
              bahwa Anda sudah membaca dan mengerti Syarat &amp; Ketentuan ini, dan
              dianggap memiliki wewenang untuk bertindak atas nama siapapun yang
              terdaftar untuk menggunakan layanan kami.
            </p>
            <p>
              Syarat &amp; Ketentuan ini terakhir diperbaharui pada tanggal 31 Juli 2017.
            </p>
            <h4>
              1. Syarat &amp; Ketentuan Zuragan
            </h4>
            <p>
              1.1. <strong>Perjanjian</strong> – berarti Syarat &amp; Ketentuan ini;
            </p>
            <p>
              1.2. <strong>Biaya Akses</strong> – berarti biaya bulanan (belum termasuk
              pajak) yang harus Anda bayar sesuai daftar biaya yang dicantumkan pada
              Website Zuragan (yang Zuragan dapat merubah dari waktu ke waktu dengan
              sepengetahuan Anda);
            </p>
            <p>
              1.3. <strong>Informasi Rahasia</strong> – melingkup semua informasi yang
              dikomunikasikan antara pihak Perjanjian ini, baik secara tertulis,
              elektronik, atau lisan, termasuk Layanan ini, tapi tidak termasuk informasi
              yang sudah menjadi atau akan dijadikan untuk publik, terkecuali yang sudah
              diungkapkan dan terbongkar tanpa hak atau oleh pihak pengguna atau lainnya
              secara tidak sah;
            </p>
            <p>
              1.4. <strong>Data</strong> – berarti data apapun yang Anda masukan atau
              dimasukan dengan kewenangan Anda kepada Website;
            </p>
            <p>
              1.5. <strong>Hak Kekayaan Intelektual</strong> – berarti paten, merek
              dagang, merek jasa atau layanan, hak cipta, hak pada disain, pengetahuan,
              atau hak kekayaan intelektual atau industri lainnya, maupun terdaftar atau
              tidak terdaftar;
            </p>
            <p>
              1.6. <strong>Layanan</strong> – berarti layanan pengelolaan akunting,
              finansial, dan operasional yang disediakan (dan dapat dirubah atau
              diperbarui dari waktu ke waktu) melalui Website;
            </p>
            <p>
              1.7. <strong>Website</strong> – berarti situs internet di domain    <u>www.zuragan.com</u> atau situs internet lainnya yang di kelola oleh
              Zuragan;
            </p>
            <p>
              1.8. <strong>Zuragan</strong> – berarti PT Zuragan Digital Indonesia yang
              terdaftar di Indonesia dengan nomor TDP;
            </p>
            <p>
              1.9. <strong>Pengguna Diundang</strong> – berarti setiap orang atau badan,
              selain Pelanggan, yang memakai Layanan dari waktu ke waktu dengan izin dari
              Pelanggan;
            </p>
            <p>
              1.10. <strong>Pelanggan</strong> - berarti orang, maupun atas nama pribadi,
              organisasi atau badan lainnya, yang mendaftar untuk menggunakan Layanan;
            </p>
            <p>
              1.11. <strong>Anda</strong> - berarti Pelanggan atau Pengguna Diundang.
            </p>
            <h4>
              2. Penggunaan Software
            </h4>
            <p>
              Zuragan memberi Anda hak untuk mengakses dan memakai Layanan Zuragan
              melalui Website kami dengan peran penggunaan yang sudah ditentukan untuk
              Anda, sesuai dengan jenis layanan yang Anda pilih. Hak ini non-eksklusif,
              tidak dapat dipindahtangankan, dan dibatasi oleh dan bergantung pada
              perjanjian ini. Anda mengakui dan menyutujui, bergantung kepada perjanjian
              tulis apapun yang berlaku antara Pelanggan dan Pengguna Diundang, atau
              hukum lainnya yang berlaku:
            </p>
            <p>
              2.1. bahwa adalah tanggung jawab Pelanggan untuk menentukan siapa yang
              mendapat akses sebagai Pengguna Diundang dan jenis peran dan hak yang
              mereka punya untuk mengakses jenis data yang Anda miliki;
            </p>
            <p>
              2.2. bahwa tanggung jawab Pelanggan untuk semua penggunaan Layanan oleh
              Pengguna Diundang;
            </p>
            <p>
              2.3. bahwa tanggung jawab Pelanggan untuk mengendalikan setiap tingkat
              akses untuk Pengguna Diundang kepada organisasi dan Layanan yang relevan
              setiap saat, dan bisa menarik atau mengubah akses atau tingkat akses
              Pengguna Diundang kapanpun, untuk alasan apapun di dalam kass manapun;
            </p>
            <p>
              2.4. jika ada perselisihan antara Pelanggan dan Pengguna Diundang mengenai
              akses kepada organisasi atau Layanan apapun, Pelanggan lah yang harus
              membuat keputusan dan mengatur akses atau tingkat akses ke Data atau
              Layanan yang Pengguna Diundang akan dapat, jika ada.
            </p>
            <h4>
              3. Ketersediaan Pelayanan Kami
            </h4>
            <h5>
              3.1. Layanan:
            </h5>
            <p>
              Layanan kami memiliki jaminan 90% uptime minimal perbulan.
            </p>
            <p>
              Jika layanan kami jatuh di bawah 90% uptime, maka pelanggan kami berhak
              mengajukan laporan dan mendapatkan kompensasi.
            </p>
            <h5>
              3.2. Product Support:
            </h5>
            <p>
              Pelayanan Product Support kami tersedia melalui 3 media:
            </p>
            <p>
              § Chat: 9.00 – 17.00, Hari Senin – Jumat
            </p>
            <p>
              Chat yang diterima di luar jam kerja akan dibalas melalui email dalam kurun
              waktu 24 jam.
            </p>
            <p>
              § Telepon: 9.00 – 17.00, Hari Senin – Jumat
            </p>
            <p>
              § Email: 9.00 – 17.00, Hari Senin – Jumat
            </p>
            <p>
              Email yang diterima di luar jam kerja akan dibalas dalam kurun waktu 24
              jam.
            </p>
            <h4>
              4. Kewajiban Anda
            </h4>
            <h5>
              4.1. Kewajiban Pembayaran
            </h5>
            <p>
              Sebuah tagihan untuk Biaya Akses akan di buat setiap bulan, mulai satu
              bulan dari tanggal Anda mulai berlangganan untuk Layanan Zuragan. Semua
              tagihan akan mengandung Biaya Akses untuk periode satu bulan pemakaian
              sebelumnya. Zuragan akan terus membuat tagihan untuk Anda setiap bulan
              sampai perjanjian ini diakhiri sesuai dengan pasal 8.
            </p>
            <p>
              Semua tagihan dari Zuragan akan dikirim kepada Anda, atau kepada kontak
              penagihan yang telah Anda berikan, melalui email. Anda harus membuat
              pembayaran untuk seluruh nilai yang tertera di tagihan Anda sebelum
              melewati tanggal jatuh tempo untuk tagihannya, yang harus dilunaskan 7 hari
              dari saat tagihan dikirim oleh Zuragan. Anda mempunyai tanggung jawab untuk
              pembayaran semua pajak dan bea yang ditambahkan kepada Biaya Akses
              tersebut. Anda juga diminta untuk menyimpan bukti transaksi. Jika layanan
              sempat terhenti sebelum pembayaran dilakukan, kami akan mengaktifkan
              layanan dalam waktu 2 hari kerja.
            </p>
            <h5>
              4.2. Kewajiban Umum
            </h5>
            <p>
              Anda harus memastikan hanya memakai Layanan dan Website untuk keperluan
              internal bisnis Anda yang benar dan secara sah, dengan Syarat dan Ketentuan
              dan pemberitahuan yang diumumkan oleh Zuragan atau ketentuan yang tercantum
              di Website. Anda boleh memakai Layanan dan Website atas nama orang atau
              badan lain, atau untuk memberi layanan kepada mereka, tetapi Anda harus
              memastikan bahwa Anda mempunyai wewenang untuk melakukannya, dan semua
              pihak yang menerima Layanan melalui Anda memenuhi dan menyetujui semua
              syarat dalam Perjanjian ini yang berlaku kepada Anda;
            </p>
            <h5>
              4.3. Syarat Akses
            </h5>
            <p>
              Anda harus memastikan bahwa semua username dan password yang diperlukan
              untuk mengakses Layanan Zuragan tersimpan dengan aman dan secara rahasia.
              Anda harus segera memberitahu Zuragan mengenai pemakaian password Anda dari
              pihak yang tidak berwenang, atau pelanggaran keamanan lainnya, dan Zuragan
              akan reset password Anda, dan Anda harus melakukan semua tindakan lainnya
              yang dianggap cukup penting oleh Zuragan untuk mempertahankan atau
              meningkatkan keamanan sistem computer dan jaringan Zuragan, dan akses Anda
              kepada Layanan kami.
            </p>
            <p>
              Sebagai syarat dari Ketentuan-ketentuan ini, saat mengakses dan menggunakan
              Layanan Zuragan, Anda harus:
            </p>
            <p>
              · Tidak mencoba untuk melemahkan keamanan atau integritas dari sistem
              komputer atau jaringan Zuragan, atau jika Layanan-nya di <em>host</em> oleh
              pihak ketiga, sistem komputer atau jaringan pihak ketiga itu;
            </p>
            <p>
              · Tidak menggunakan atau menyalahgunakan Layanan Zuragan dengan cara apapun
              yang dapat mengganggu kemampuan pengguna lain untuk menggunakan Layanan
              atau Website;
            </p>
            <p>
              · Tidak mencoba untuk mendapatkan akses yang tidak sah kepada materi apapun
              selain yang sudah dinyatakan dengan jelas bahwa Anda telah mendapatkan izin
              untuk mengakses-nya, atau untuk mengakses sistem komputer kami dimana
              Layanan-nya di <em>host</em>;
            </p>
            <p>
              · Tidak mengirimkan, atau memasukan kedalam Website: file apapun yang dapat
              merusak alat komputer atau <em>software</em> orang lain, bahan-bahan yang
              menghina, atau materi atau Data yang melanggar hukum apapun (termasuk Data
              atau materi lainnya yang terlindungi oleh hak cipta atau rahasia dagang
              dimana Anda tidak memiliki hak untuk memakainya);
            </p>
            <p>
              · Tidak mencoba untuk mengubah, menyalin, meniru, membongkar, atau
              melakukan reverse engineering untuk program komputer apapun yang dipakai
              untuk memberi Layanan Zuragan, atau untuk menggunakan Website di luar
              penggunaan yang diperlukan dan dimaksudkan.
            </p>
            <h5>
              4.4. Batasan Penggunaan
            </h5>
            <p>
              Penggunaan Layanan Zuragan mungkin dapat dibatasi melingkup, tapi tidak
              terbatas kepada, volume transaksi bulanan dan jumlah panggilan yang Anda
              diizinkan untuk gunakan dengan memanggil kepada programming interface
              aplikasi Zuragan. Bila ada, batasan-batasan tersebut akan ditentukan dan
              dicantumkan pada Layanan yang terkait.
            </p>
            <h5>
              4.5. Syarat Komunikasi
            </h5>
            <p>
              Sebagai syarat pada Ketentuan ini, jika Anda memakai alat komunikasi apapun
              yang tersedia melalui Website (seperti <em>forum</em> apapun atau ruang    <em>chat</em>), Anda setuju untuk memakai alat-alat komunikasi tersebut
              hanya untuk tujuan yang sah. Anda tidak boleh memakai alat-alat komunikasi
              tersebut untuk memasang atau menyebarkan materi apapun yang tidak terkait
              dengan pemakaian Layanan-nya, termasuk (tapi tidak terbatas dengan):
              menawarkan barang dan jasa untuk dijual, <em>e-mail</em> komersial yang
              tidak diminta atau diinginkan, file yang dapat merusak alat komputer atau
              software orang lain, bahan-bahan yang mungkin dapat menghina pengguna
              Layanan atau Website yang lain, atau materi yang melanggar hukum apapun
              (termasuk materi yang terlindungi oleh hak cipta atau rahasia dagang dimana
              Anda tidak memiliki hak untuk memakainya).
            </p>
            <p>
              Saat Anda melakukan komunikasi dalam bentuk apapun di Website, Anda
              menjamin bahwa Anda diperbolehkan untuk membuat komunikasi tersebut.
              Zuragan tidak berkewajiban untuk memastikan bahwa komunikasi pada Website
              adalah sah dan benar, atau bahwa mereka terkait hanya pada penggunaan
              Layanan. Zuragan berhak untuk menghapus komunikasi apapun setiap saat atas
              kebijakannya sendiri.
            </p>
            <h5>
              4.6. Tanggung Jawab Ganti Rugi
            </h5>
            <p>
              Anda membebaskan Zuragan dari semua: tuntutan, gugatan, biaya kerugian,
              kerusakan, dan kehilangan yang timbul sebagai hasil dari pelanggaran Anda
              kepada Syarat dan Ketentuan yang tertera di Perjanjian ini, atau kewajiban
              apapun yang mungkin Anda punya kepada Zuragan, termasuk (tapi tidak
              terbatas kepada) biaya apapun yang berkaitan kepada perolehan Biaya Akses
              apapun yang sudah jatuh tempo tetapi belum Anda bayar.
            </p>
            <h4>
              5. Kerahasiaan dan Privasi
            </h4>
            <h5>
              5.1. Kerahasiaan
            </h5>
            <p>
              Masing-masing pihak berjanji untuk menjaga kerahasiaan semua Informasi
              Rahasia pihak lainnya sehubungan dengan ketentuan ini. Setiap pihak TIDAK
              AKAN, tanpa persetujuan tertulis dari pihak yang lain, mengungkapkan atau
              memberi Informasi Rahasia kepada siapapun, atau menggunakannya untuk
              kepentingan sendiri, selain sebagaimana dimaksud oleh Ketentuan ini.
            </p>
            <p>
              Kewajiban masing-masing pihak dalam ketentuan ini akan bertahan walaupun
              setelah pemutusan Ketentuan ini.
            </p>
            <p>
              Ketentuan-ketentuan pasal tidak berlaku untuk informasi yang:
            </p>
            <p>
              · Telah menjadi pengetahuan umum selain karena pelanggaran ketentuan ini;
            </p>
            <p>
              · Diterima dari pihak ketiga yang dengan secara sah memperolehnya, dan
              tidak mempunyai kewajiban untuk membatasi pengungkapannya;
            </p>
            <p>
              · Dikembangkan dengan sendiri tanpa akses kepada Informasi Rahasia.
            </p>
            <h5>
              5.2. Privasi
            </h5>
            <p>
              Zuragan memiliki dan mempertahankan kebijakan privasi yang menjelaskan dan
              menetapkan kewajiban para pihak untuk menghormati informasi pribadi. Anda
              disarankan membaca kebijakan privasi kami di www.Zuragan.id/privacy, dan
              Anda akan dianggap sudah menyetujui kebijakan itu saat Anda menyetujui
              ketentuan ini.
            </p>
            <h4>
              6. Intellectual Property
            </h4>
            <p>
              Kepemilikan dan semua Hak Kekayaan Intelektual yang didapat pada Layanan,
              Website, dan dokumentasi apapun yang terkait dengan Layanan tetap menjadi
              hak milik Zuragan.
            </p>
            <p>
              Kepemilikan dan semua Hak Kekayaan Intelektual yang terdapat di Data tetap
              menjadi hak milik Anda. Akan tetapi, akses kepada Data Anda bergantung pada
              pelunasan Biaya Akses Zuragan saat tagihan jatuh tempo. Anda memberi izin
              kepada Zuragan untuk memakai, menyalin, mengirim, menyimpan, dan melakukan
              back-up untuk informasi dan Data Anda dengan maksud dan tujuan memberi Anda
              akses kepada dan agar dapat menggunakan Layanan Zuragan, atau untuk tujuan
              lainnya yang terkait dengan penyediaan layanan kami untuk Anda.
            </p>
            <p>
              Anda sangat disarankan untuk menyimpan salinan untuk semua Data yang Anda
              masukan ke dalam Layanan Zuragan. Zuragan mematuhi kebijakan dan menjalani
              prosedur terbaik untuk mencegah kehilangan data, termasuk rutinitas sistem
              harian untuk back-up data, tetapi tidak membuat jaminan apapun bahwa tidak
              akan pernah adanya kehilangan Data. Zuragan dengan jelas mengesampingkan
              tanggung jawab untuk setiap kehilangan Data dengan sebab apapun.
            </p>
            <h4>
              7. Jaminan dan Pengakuan
            </h4>
            <h5>
              7.1.
            </h5>
            <p>
              Anda menjamin bahwa, jika Anda mendaftar untuk menggunakan Layanan
              atas nama orang lain, Anda memiliki wewenang untuk menyetujui
              Ketentuan-ketentuan ini atas nama orang tersebut, dan menyetujui bahwa
              dengan mendaftar untuk memakai Layanan Zuragan, Anda mengikat orang yang
              Anda atas namakan untuk, atau dengan niat untuk, membuat tindakan atas nama
              mereka kepada setiap kewajiban manapun yang Anda telah setujui pada
              Ketentuan-ketentuan ini, tanpa membatasi kewajiban Anda sendiri kepada
              ketentuannya.
            </p>
            <h5>
              7.2. Anda mengakui bahwa:
            </h5>
            <p>
              7.2.1. Anda memiliki wewenang untuk menggunakan Layanan dan Website, dan
              untuk mengakses informasi dan Data yang Anda masukan kedalam Website,
              termasuk informasi atau Data apapun yang dimasukan kedalam Website oleh
              siapapun yang Anda telah beri kewenangan untuk menggunakan Layanan Zuragan.
            </p>
            <p>
              Anda juga berwenang untuk mengakses informasi dan data yang sudah di
              proses, yang disediakan untuk Anda melalui penggunaan Anda pada Website dan
              Layanan kami (maupun informasi dan Data itu Anda miliki sendiri atau milik
              orang lain).
            </p>
            <p>
              7.2.2. Zuragan tidak bertanggung jawab kepada siapapun selain Anda, dan
              tidak ada maksud apapun dalam Perjanjian ini untuk memberi manfaat kepada
              siapapun selain Anda. Jika Anda memakai Layanan atau mengakses Website atas
              nama atau untuk manfaat seseorang selain Anda (maupun organisasi berbadan
              hukum atau tidak, atau lainnya), Anda menyutujui bahwa:
            </p>
            <p>
              · Anda bertanggung jawab untuk memastikan bahwa Anda memiliki hak untuk
              melakukannya;
            </p>
            <p>
              · Anda bertanggung jawab atas memberi wewenang kepada siapapun yang Anda
              berikan akses kepada informasi atau Data, dan Anda menyutujui bahwa Zuragan
              tidak memiliki tanggung jawab untuk menyediakan siapapun akses kepada
              informasi atau Data tersebut tanpa otorisasi Anda, dan boleh menunjukan
              permohonan apapun untuk mendapatkan informasi kepada Anda untuk di layani;
            </p>
            <p>
              · Anda membebaskan Zuragan dari klaim apapun atau kehilangan yang terkait
              pada: Penolakan Zuragan untuk menyediakan akses pada siapapun kepada
              informasi atau Data Anda sesuai dengan ketentuan ini; Penyediaan informasi
              atau Data oleh Zuragan kepada siapapun berdasarkan otorisasi Anda.
            </p>
            <p>
              7.2.3. Penyediaan, akses kepada, dan pemakaian Layanan Zuragan tersedia
              sebagaimana adanya dan pada resiko Anda sendiri
            </p>
            <p>
              7.2.4. Zuragan tidak menjamin bahwa penggunaan Layanan tidak akan pernah
              terganggu atau bebas dari kesalahan. Di antara lain, operasi dan
              ketersediaan sistem yang digunakan untuk mengakses Layanan, termasuk
              layanan telpon umum, jaringan komputer dan internet, bisa susah diprediksi
              dan mungkin bisa dari waktu ke waktu menggangu atau mencegah akses kepada
              Layanan. Zuragan dengan bagaimanapun tidak bertanggung jawab atas gangguan
              tersebut, atau pencegahan akses kepada penggunaan Layanan.
            </p>
            <p>
              7.2.5. Zuragan bukanlah akuntan Anda, dan penggunaan Layanan tidak
              merupakan penerimaan nasihat akunting. Jika Anda memiliki pertanyaan
              akunting, harap hubungi seorang akuntan.
            </p>
            <p>
              7.2.6. Untuk menentukan bahwa Layanan kami memenuhi keperluan bisnis Anda
              dan bisa digunakan sesuai dengan tujuan adalah tanggung jawab Anda sendiri.
            </p>
            <p>
              7.2.7. Anda tetap memiliki tanggung jawab untuk mematuhi semua
              undang-undang akunting, perpajakan, dan lainnya yang berlaku. Menjadi
              tanggung jawab Anda untuk memeriksa bahwa penyimpanan dan akses kepada Data
              Anda melalui Layanan dan Website tetap mematuhi undang-undang yang berlaku
              kepada Anda (termasuk undang-undang apapun yang membutuhkan Anda untuk
              menyimpan arsip).
            </p>
            <h5>
              7.3.
            </h5>
            <p>
              Zuragan tidak memberi jaminan untuk Layanan-nya. Tanpa mengabaikan
              ketentuan di atas, Zuragan tidak menjamin bahwa Layanan kami akan memenuhi
              keperluan Anda, atau bahwa akan sesuai untuk tujuan yang Anda niatkan.
              Untuk menghindari keraguan, semua ketentuan atau jaminan yang bisa
              diartikan dikecualikan sejauh yang diijinkan oleh hukum, termasuk (tanpa
              batasan) jaminan penjualan, kesesuaian untuk tujuan, dan tanpa pelanggaran.
            </p>
            <h5>
              7.4.
            </h5>
            <p>
              Anda menjamin dan menunjukkan bahwa Anda sedang memperoleh hak untuk
              mengakses dan menggunakan Layanan untuk tujuan bisnis dan bahwa, sampai
              batas maksimum yang diizinkan oleh hukum, jaminan konsumen berdasarkan
              hukum atau undang-undang yang dimaksudkan untuk melindungi konsumen
              non-bisnis di yurisdiksi manapun tidak berlaku untuk penyediaan Layanan,
              Website, atau ketentuan ini.
            </p>
            <h4>
              8. Batasan Kewajiban:
            </h4>
            <p>
              8.1. Sampai batas maksimal yang diizinkan oleh hukum, Zuragan mengecualikan
              semua kewajiban dan tanggung jawab kepada Anda (atau orang lain manapun)
              dalam kontrak, gugatan kesalahan(termasuk kelalaian), atau selainnya, untuk
              kehilangan apapun (termasuk kehilangan informasi, Data, keuntungan, dan
              tabungan) atau kerusakan yang diakibatkan, secara langsung atau tidak
              langsung, dari penggunaan apapun, atau ketergantungan kepada, Layanan atau
              Website.
            </p>
            <p>
              8.2. Jika Anda mengalami kerugian atau kerusakan apapun karena kelalaian
              atau kegagalan Zuragan untuk memenuhi ketentuan ini, klaim apapun dari Anda
              kepada Zuragan yang timbul dari kelalaian atau kegagalan Zuragan akan
              dibataskan mengenai satu kejadian, atau serangkaian kejadian yang
              terhubung, kepada Biaya Akses yang sudah Anda lunaskan dalam 12 bulan
              sebelumnya.
            </p>
            <p>
              8.3. Jika Anda tidak puas dengan Layanan-nya, jalur penyelesaian tunggal
              dan eksklusif Anda adalah untuk menhentikan ketentuan ini sesuai dengan
              pasal 8.
            </p>
            <h4>
              9. Pemutusan Kontrak
            </h4>
            <h5>
              9.1. Kebijakan Masa Percobaan:
            </h5>
            <p>
              Saat Anda pertama mendaftar untuk mengakses Layanan, Anda bisa mengevaluasi
              Layanan-nya dengan ketentuan untuk masa percobaan yang sudah di tentukan,
              tanpa kewajiban untuk melanjutkan penggunaan Layanan-nya. Jika Anda memilih
              untuk melanjutkan penggunaan Layanan setelah masa percobaan selesai, Anda
              akan mulai ditagih dari hari sama dimana Anda memasuki informasi untuk
              penagihan Anda. Jika Anda memilih untuk berhenti menggunakan Layanan-nya,
              Anda bisa menghapus organisasi Anda.
            </p>
            <h5>
              9.2. </h5>
            <p>
              Zuragan tidak menyediakan pengembalian uang untuk periode prabayar
              yang tersisa pada langganan Biaya Akses Anda.
            </p>
            <p>
            <h5>
              9.3.
            </h5>
            <p>
              Ketentuan ini akan berlaku untuk periode yang dicakup oleh Biaya Akses
              yang telah atau dapat dibayar pada pasal 3 ayat 1. Pada masa akhir setiap
              periode penagihan, Ketentuan ini akan berlanjut secara otomatis untuk
              periode selanjutnya untuk jangka watu yang sama, asalkan Anda terus
              membayar Biaya Akses yang sudah ditentukan saat jatuh tempo, kecuali salah
              satu pihak mengakhiri Ketentuan ini dengan pemberitahuan kepada pihak
              lainnya setidaknya 30 hari sebelum akhir periode pembayaran yang
              bersangkutan.
            </p>
            <h5>
              9.4. Pelanggaran
            </h5>
            <p>
              9.4.1. Jika Anda melanggar apapun dari Ketentuan ini (termasuk, tapi tidak
              terbatas dengan, tidak membayar Biaya Akses apapun) dan tidak menyelesaikan
              masalah pelanggaran dalam 14 hari setelah menerima pemberitahuan
              pelanggaran tersebut jika permasalahan pelanggarang tersebut bisa
              diselesaikan;
            </p>
            <p>
              9.4.2. Jika Anda melanggar apapun dari Ketentuan ini dan pelanggaran itu
              tidak bisa diselesaikan (termasuk, tapi tidak terbatas dengan) pelanggaran
              apapun mengenai pasal 3 ayat 4 atau kegagalan untuk membayar Biaya Akses
              yang sudah melewati tanggal jatuh tempo lebih dari 30 hari;
            </p>
            <p>
              9.4.3. Jika Anda atau bisnis Anda bangkrut, atau sedang melewati proses
              untuk mengakhiri keberadaan organisasi, Zuragan bisa mengambil salah satu
              atau semua tindakan berikut:
            </p>
            <p>
              · Mengakhiri Perjanjian ini dan penggunaan Anda untuk Layanan dan Website
              kami;
            </p>
            <p>
              · Menunda akses Anda kepada Layanan dan Website Zuragan untuk periode yang
              tidak menentu;
            </p>
            <p>
              · Menunda akses atau mengakhiri akses kepada semua Data atau Data apapun;
            </p>
            <p>
              9.4.4. Pemutusan Ketentuan ini tidak mengurangi hak dan kewajiban para
              pihak yang masih harus dibayar sampai dengan tanggal terminasi. Pada
              pengakhiran Perjanjian ini Anda akan tetap menanggung biaya yang masih
              harus dibayar dan jumlah yang jatuh tempo untuk pembayaran sebelum atau
              setelah pengakhiran, dan segera berhenti menggunakan Layanan dan Website
              kami.
            </p>
            <h4>
              10. Ketentuan Umum Lainnya
            </h4>
            <p>
              10.1. Syarat dan Ketentuan ini, bersama dengan Kebijakan Privasi Zuragan
              dan ketentuan dari pemberitahuan atau instruksi yang diberikan kepada Anda
              di bawah Syarat dan Metentuan ini menggantikan dan menghapus semua
              perjanjian sebelumnya, representasi (baik lisan maupun tulisan), dan
              pemahaman, dan merupakan keseluruhan perjanjian antara Anda dan Zuragan
              yang berhubungan dengan Layanan dan hal lainnya yang dibahas dalam
              Ketentuan ini.
            </p>
            <p>
              10.2. Jika salah satu pihak melepaskan tuntutan dari pelanggaran apapun
              pada Ketentuan ini, ini tidak akan melepaskan mereka dari tuntutan
              pelanggaran lainnya. Pelepasan dari tuntuntan tidak efektif kecuali dibuat
              secara tulisan.
            </p>
            <p>
              10.3. Para pihak tidak harus bertanggung jawab atas keterlambatan atau
              kegagalan dalam untuk menyelesaikan kewajibannya di bawah Ketentuan ini
              jika keterlambatan atau kegagalannya adalah karena sebab apapun yang di
              luar kendali. Ayat ini tidak berlaku untuk kewajiban pembayaran uang
              apapun.
            </p>
            <p>
              10.4. Anda tidak dapat mengalihkan atau mentransfer hak kepada orang lain
              tanpa persetujuan tertulis dari Zuragan.
            </p>
            <p>
              10.5. Apabila terjadi perselisihan antara kedua belah pihak, akan coba
              diselesaikan secara musyawarah terlebih dahulu untuk mencapai mufakat.
              Apabila dengan cara tersebut tidak tercapai kata sepakat, maka kedua belah
              pihak sepakat untuk menyelesaikan permasalahan tersebut dilakukan melalui
              prosedur hukum dengan memilih kedudukan hukum Republik Indonesia di Kantor
              Pengadilan Negeri Jakarta Barat.
            </p>
            <p>
              10.6. Setiap pemberitahuan yang diberikan berdasarkan Persyaratan ini oleh
              satu pihak ke yang lain harus dilakukan secara tertulis melalui email dan
              akan dianggap telah diberikan pada saat transmisi dilakukan. Pemberitahuan
              kepada Zuragan harus dikirim ke support@Zuragan.id atau ke alamat email
              lainnya yang diberitahukan kepada Anda oleh Zuragan. Pemberitahuan kepada
              Anda akan dikirim ke alamat email yang Anda berikan saat membuat akses Anda
              pada Layanan kami.
            </p>
            <p>
              10.7. Subscription adalah pembayaran berulang yang dibayar di muka untuk
              mengkonsumsi jasa aplikasi yang disediakan Zuragan.id . Setelah
              subscription telah dibeli, anda bisa membatalkan setiap saat tanpa biaya
              tambahan kecuali yang sudah dibayarkan. Pembatalan membutuhkan paling lama
              31 hari sebelum efektif.
            </p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" @click="toggleTermsModal" data-dismiss="modal">Close</button>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->

    <form method="POST" @submit.prevent="register">

      <div class="wrapper-page form-horizontal m-t-20">
        <div class="panel panel-color panel-primary panel-pages panel-sign-in">

          <div class="panel-heading">
            <div class="bg-overlay">
              <div class="zuragan-logo-login" style="padding-left:15px; padding-top:15px;">
                <img src="/static/images/zuragan_logo_login.png" height="62" width="125">
              </div>
            </div>
          </div>

          <div class="panel-body">
            <!-- <p v-if="$route.query.email" class="text-center" style="margin:10px auto 30px auto;">You've already have an account in Zuragan identity. Just complete this form and we'll help to build your store.</p> -->
            <h4 class="text-center" style="margin:10px auto 30px auto;">Create New Account</h4>
            <div class="form-group">
              <input
                type="text"
                id="organization_name"
                v-model.trim="organization_name"
                class="form-control input-lg"
                placeholder="Organization name"
                @keyup="changePortalName"
                required
                :disabled="loading"
              />
              <div v-if="errors.organization_name" class="help-block alert alert-danger">{{ errors.organization_name }}</div>
              <div v-if="errors.organization_portal" class="help-block alert alert-danger">{{ errors.organization_portal }}</div>
            </div>

            <!--<div class="form-group">-->
              <!--<div class="col-xs-12">-->
                <!--<div class="input-group">-->
                  <!--<input-->
                    <!--type="text"-->
                    <!--id="organization_portal"-->
                    <!--v-model.trim="organization_portal"-->
                    <!--class="form-control input-lg"-->
                    <!--placeholder="Organization portal"-->
                    <!--@change="checkPortalNameAvailability"-->
                    <!--@blur="checkPortalNameAvailability"-->
                    <!--required-->
                  <!--/>-->
                  <!--<div class="input-group-addon">.zuragan.com</div>-->
                <!--</div>-->
                <!--<div class="alert alert-warning" v-if="isPortalNameNotAvailable === false">-->
                  <!--Organization portal name is not available-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->

            <div class="form-group">
              <input
                type="email"
                id="email"
                v-model.trim="email"
                class="form-control input-lg"
                placeholder="Email"
                required
                :disabled="loading"
              />
              <div v-if="errors.email" class="help-block alert alert-danger">{{ errors.email }}</div>
            </div>

            <div class="form-group">
              <input
                type="password"
                id="password"
                v-model="password"
                class="form-control input-lg"
                placeholder="Password"
                required
                :disabled="loading"
              />
            </div>

            <div class="form-group">
              <input
                type="password"
                id="password_confirmation"
                v-model="password_confirmation"
                class="form-control input-lg"
                placeholder="Password confirmation"
                required
                :disabled="loading"
              />
              <div v-if="errors.password" class="help-block alert alert-danger">{{ errors.password }}</div>
            </div>

            <div class="form-group">

              <div class="checkbox checkbox-primary">
                <input id="accept-terms" type="checkbox" v-model="accept_terms" required :disabled="loading" />
                <label for="accept-terms"> I accept <a href="javascript:;" @click="toggleTermsModal">Terms and Conditions</a> </label>
              </div>

            </div>

            <div class="form-group text-center m-t-30">
              <button
                v-if="!loading"
                type="submit"
                id="submit"
                class="btn btn-primary waves-effect waves-light btn-lg w-lg"
                :disabled="!isRegisterButtonActive"
              >
                Register
              </button>
              <button
                v-else
                type="button"
                disabled
                class="btn btn-disabled waves-effect waves-light btn-lg w-lg"
              >
                Loading...
              </button>
            </div>

            <div class="form-group m-t-30">
              <div class="col-sm-12 text-center">
                <router-link id="goto-login" :to="{ name: 'auth.login' }">
                  Already have an account?
                </router-link>
              </div>
            </div>
          </div>

        </div>
      </div>

    </form>
  </div>
</template>

<script>
  import store from 'src/store'
  import slugify from "src/helpers/slugify"
  import { responseOk, swal_error, swal_success } from 'src/helpers'

  export default {
    name: 'Register',

    data() {
      return {
        loading: false,
        organizationPortalHasChanged: false,
        showTerms: false,
        errors: {
          organization_name: '',
          email: '',
          password: '',
        }
      }
    },

    mounted(){
      if (this.$route.query.email) {
        this.email = this.$route.query.email;
      }
    },

    computed: {
      organization_name: {
          get() { return store.state.registration.organization_name },
          set(value) { store.commit('registration/ORGANIZATION_NAME', value) },
      },
      organization_portal: {
          get() { return store.state.registration.organization_portal },
          set(value) { store.commit('registration/ORGANIZATION_PORTAL', value) },
      },
      isPortalNameNotAvailable() {
        // NOTE: This "key name" and "value" are weird.
        // If `is_available` return false, that means portal name "is available".
        return store.state.registration.portal_name_is_not_available
      },
      email: {
          get() { return store.state.registration.email },
          set(value) { store.commit('registration/EMAIL', value) },
      },
      password: {
          get() { return store.state.registration.password },
          set(value) { store.commit('registration/PASSWORD', value) },
      },
      password_confirmation: {
          get() { return store.state.registration.password_confirmation },
          set(value) { store.commit('registration/PASSWORD_CONFIRMATION', value) },
      },
      accept_terms: {
          get() { return store.state.registration.accept_terms },
          set(value) { store.commit('registration/ACCEPT_TERMS', value) },
      },
      isRegisterButtonActive() {
        return true
//        return store.state.registration.organization_name.length > 1
//          && store.state.registration.portal_name_is_not_available
//          && new RegExp(/[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,4}/).test(store.state.registration.email)
//          && store.state.registration.password.length >= 6
//          && store.state.registration.password === store.state.registration.password_confirmation
//          && store.state.registration.accept_terms
      }
    },

    methods: {

      changePortalName() {
        if (this.organizationPortalHasChanged === false) {
          this.organization_portal = slugify(this.organization_name)
        }
      },

      async register () {
        try {
          this.loading = true
          const res = await store.dispatch('registration/register')

          if (!responseOk(res.data.code)) {

            if (res.data.hasOwnProperty('message') && res.data.message.hasOwnProperty('organization_portal')) {
              this.errors.organization_portal = res.data.message.organization_portal[0]
            }

            if (res.data.hasOwnProperty('message') && res.data.message.hasOwnProperty('organization_name')) {
              this.errors.organization_name = res.data.message.organization_name[0]
            }

            if (res.data.hasOwnProperty('message') && res.data.message.hasOwnProperty('email')) {
              this.errors.email = res.data.message.email[0]
            }

            if (res.data.hasOwnProperty('message') && res.data.message.hasOwnProperty('password')) {
              this.errors.password = res.data.message.password[0]
            }

            this.loading = false
            return;
          }

          if (res.data.message === 'User is not registered on this application.') {
            this.$router.push({
              name: 'auth.register.company',
              query: {
                email: this.email,
              }
            })
            return
          }

          swal_success(res)
          this.$router.push({name: 'auth.register.thankyou'})

          this.loading = false

        } catch (err) {
          this.loading = false
          _.each(err.data.message, message => {
            _.each(message, msg => {
              Alert.error(msg)
            })
          })
        }
      },


      checkPortalNameAvailability() {
        this.organizationPortalHasChanged = true
        store.dispatch('registration/checkPortalNameAvailability')
      },

      toggleTermsModal() {
        this.showTerms = ! this.showTerms

        this.showTerms
          ? document.body.style.overflow = 'hidden'
          : document.body.style.overflow = 'visible'
      },

    }

}



</script>

<style scoped>
  .modal {
    overflow: auto;
  }
</style>
