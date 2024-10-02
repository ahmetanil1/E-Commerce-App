const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode; // Eğer durum kodu 200 ise 500 kullan

    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack, // Üretim ortamında hata yığınını gizle
        // node_env production olması errorları halletmede zorluk çıkarır bu yüzden geliştirme aşamasında development yapmak hata ayıklamada yardımcı olur. 
    });
};

module.exports = errorHandler;
