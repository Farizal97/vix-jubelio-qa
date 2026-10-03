const { Builder, By, until } = require('selenium-webdriver');

async function runAutomation() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.manage().window().maximize();

        // ==========================================
        // CHALLENGE 1: AUTOMATION SCENARIO FOR LOGIN
        // ==========================================
        console.log("1. Membuka Halaman Login Sauce Demo...");
        await driver.get('https://saucedemo.com');

        let usernameField = await driver.wait(until.elementLocated(By.id('user-name')), 10000);
        let passwordField = await driver.findElement(By.id('password'));
        let loginButton = await driver.findElement(By.id('login-button'));

        console.log("Mengisi data username dan password...");
        await usernameField.sendKeys('standard_user');
        await passwordField.sendKeys('secret_sauce');
        
        console.log("Mengklik tombol login...");
        await loginButton.click();

        await driver.wait(until.urlContains('/inventory.html'), 10000);
        console.log("SUKSES: Login Berhasil!");

        // Beri jeda 2 detik agar halaman katalog stabil
        await driver.sleep(2000);

        // ===============================================
        // CHALLENGE 2: AUTOMATION SCENARIO FOR INVENTORY
        // ===============================================
        console.log("2. Memulai Mengatur Item pada Inventory Catalog...");

        // Pastikan elemen Add to Cart benar-benar siap diklik secara sistem
        let addToCartBtn = await driver.wait(
            until.elementLocated(By.id('add-to-cart-sauce-labs-backpack')), 
            10000
        );
        await driver.wait(until.elementIsVisible(addToCartBtn), 5000);

        console.log("Mengklik tombol 'Add to cart' menggunakan JS Executor...");
        // Memicu klik langsung lewat browser script untuk menjamin tombol tertekan
        await driver.executeScript("arguments[0].click();", addToCartBtn);

        // Menunggu tombol berubah menjadi Remove
        console.log("Menunggu tombol 'Remove' muncul...");
        let removeBtn = await driver.wait(
            until.elementLocated(By.id('remove-sauce-labs-backpack')), 
            10000
        );
        
        let buttonText = await removeBtn.getText();
        
        // Verifikasi counter badge keranjang belanja
        let cartBadge = await driver.findElement(By.className('shopping_cart_badge'));
        let cartCount = await cartBadge.getText();

        if (buttonText.toUpperCase() === "REMOVE" && cartCount === "1") {
            console.log(`\n🎉 SUKSES BESAR: Status produk di katalog inventory berhasil diubah!`);
            console.log(`Teks Tombol Saat Ini: ${buttonText}`);
            console.log(`Jumlah Barang di Keranjang: ${cartCount}\n`);
        } else {
            console.log("GAGAL: Status teks tombol atau jumlah keranjang tidak sesuai.");
        }

    } catch (error) {
        console.error("Terjadi kendala saat skrip otomatisasi berjalan:", error);
    } finally {
        // Jeda 5 detik agar Anda sempat merekam video / screenshot hasil suksesnya
        await driver.sleep(5000);
        console.log("Menutup browser otomatis...");
        await driver.quit();
    }
}

runAutomation();
