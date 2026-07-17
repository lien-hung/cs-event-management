export const Banner = () => {
  return (
    <div className="container-fluid p-0 mb-5">
      <div id="header-carousel" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item">
            <img
              className="w-100"
              src="https://hotro.ueh.edu.vn/images/img-home.png"
              alt="Image"
            />
            <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
              <div className="p-3" style={{ maxWidth: "900px" }}>
                <h1 className="display-1 text-dark mb-md-4 animate__animated animate__zoomIn fw-bold">
                  NHIỀU SỰ KIỆN HẤP DẪN ĐANG CHỜ BẠN
                </h1>
                <a
                  href="/login"
                  className="btn btn-primary py-md-3 px-md-5 me-3 animate__animated animate__slideInLeft"
                >
                  Tham Gia Ngay
                </a>
              </div>
            </div>
          </div>
          <div className="carousel-item active">
            <img
              className="w-100"
              src="https://hotro.ueh.edu.vn/images/img-home.png"
              alt="Image"
            />
            <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
              <div className="p-3" style={{ maxWidth: "900px" }}>
                <h1 className="display-1 text-dark mb-md-4 animate__animated animate__zoomIn fw-bold">
                  THAM GIA CÁC HOẠT ĐỘNG SÔI NỔI
                </h1>
                <a
                  href="/login"
                  className="btn btn-primary py-md-3 px-md-5 me-3 animate__animated animate__slideInLeft"
                >
                  Tham Gia Ngay
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        style={{ marginTop: "-100px", position: "absolute" }}
        className="carousel-control-prev"
        type="button"
        data-bs-target="#header-carousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        style={{ marginTop: "-100px", position: "absolute" }}
        className="carousel-control-next"
        type="button"
        data-bs-target="#header-carousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};