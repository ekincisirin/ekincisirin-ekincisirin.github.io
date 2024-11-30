// Zaman dilimlerinin eşleştirildiği bir nesne
const zamanDilimiEslestirmeleri = {
    "Turkey/Istanbul": "Europe/Istanbul",
    "United States/New York": "America/New_York",
    "United States/Los Angeles": "America/Los_Angeles",
    "United States/Chicago": "America/Chicago",
    "Germany/Berlin": "Europe/Berlin",
    "Germany/Munich": "Europe/Berlin",
    "Germany/Hamburg": "Europe/Berlin",
    "France/Paris": "Europe/Paris",
    "France/Lyon": "Europe/Paris",
    "France/Marseille": "Europe/Paris",
    "Japan/Tokyo": "Asia/Tokyo",
    "Japan/Osaka": "Asia/Tokyo",
    "Japan/Kyoto": "Asia/Tokyo",
    "India/Delhi": "Asia/Kolkata",
    "India/Mumbai": "Asia/Kolkata",
    "India/Bangalore": "Asia/Kolkata",
    "Russia/Moscow": "Europe/Moscow",
    "Russia/Saint Petersburg": "Europe/Moscow",
    "Russia/Kazan": "Europe/Moscow",
    "Ireland/Dublin": "Europe/Dublin"
};

// Seçilen şehirler için dropdown menülerini dolduran fonksiyon
function dropdownDoldur(dropdownId) {
    const dropdownElement = document.getElementById(dropdownId);
    dropdownElement.innerHTML = "<option value=''>Seçiniz</option>"; // Boş bir seçenek ekleyin

    for (const kullaniciDostuZon of Object.keys(zamanDilimiEslestirmeleri)) {
        const option = document.createElement("option");
        option.value = kullaniciDostuZon;
        option.textContent = kullaniciDostuZon;
        dropdownElement.appendChild(option);
    }
}

// Kullanıcı dostu zaman dilimini IANA zaman dilimine çeviren fonksiyon
function zamanDilimineCevir(kullaniciDostuZone) {
    return zamanDilimiEslestirmeleri[kullaniciDostuZone] || null;
}

// Saatleri güncelleyen fonksiyon
function saatleriGuncelle() {
    const sehir1Input = document.getElementById("city1").value;
    const sehir2Input = document.getElementById("city2").value;

    const sehir1 = zamanDilimineCevir(sehir1Input);
    const sehir2 = zamanDilimineCevir(sehir2Input);

    if (sehir1) {
        const sehir1Saat = new Date().toLocaleString("tr-TR", { timeZone: sehir1, hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
        document.getElementById("city1-time").textContent = sehir1Saat;
    } else {
        document.getElementById("city1-time").textContent = "--:--:--";
    }

    if (sehir2) {
        const sehir2Saat = new Date().toLocaleString("tr-TR", { timeZone: sehir2, hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
        document.getElementById("city2-time").textContent = sehir2Saat;
    } else {
        document.getElementById("city2-time").textContent = "--:--:--";
    }
}

// Hesaplama butonuna tıklanıldığında çalışan fonksiyon
document.getElementById("calculate").addEventListener("click", function () {
    const sehir1Input = document.getElementById("city1").value;
    const sehir2Input = document.getElementById("city2").value;

    const sehir1 = zamanDilimineCevir(sehir1Input);
    const sehir2 = zamanDilimineCevir(sehir2Input);

    if (!sehir1 || !sehir2) {
        alert("Lütfen geçerli bir şehir/ülke seçin!");
        console.error(`Geçersiz giriş: '${sehir1Input}' ve/veya '${sehir2Input}'`);
        return;
    }

    try {
        // Zaman farkını hesaplama
        const sehir1Tarihi = new Date(new Date().toLocaleString("en-US", { timeZone: sehir1 }));
        const sehir2Tarihi = new Date(new Date().toLocaleString("en-US", { timeZone: sehir2 }));

        const zamanFarki = Math.abs((sehir1Tarihi - sehir2Tarihi) / (1000 * 60 * 60)); // Saat cinsinden fark
        document.getElementById("time-difference").textContent = zamanFarki.toFixed(1);
    } catch (error) {
        alert("Bir hata oluştu. Detaylar konsolda görüntülenebilir.");
        console.error("Hata Detayları:", error);
    }
});

// Sayfa yüklendiğinde şehir dropdown'larını doldur
dropdownDoldur("city1");
dropdownDoldur("city2");

// Saatleri her saniye güncelle
setInterval(saatleriGuncelle, 1000);
