import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useAppDispatch, useAppSelector } from "../hooks";
import { getEvent } from "../store/eventSlice";
import { getCategory } from "../store/categorySlice";

export function Activities() {
  const dispatch = useAppDispatch();
  const events = useAppSelector((state) => state.event.events);
  const categories = useAppSelector((state) => state.category.categories);
  const [selectedCategory, setSelectedCategory] = useState<number>();

  useEffect(() => {
    dispatch(getEvent());
    dispatch(getCategory());
  }, [dispatch]);

  const handleCategoryClick = (categoryId: number) => {
    setSelectedCategory(categoryId);
  };

  const handleShowAll = () => {
    setSelectedCategory(undefined);
  };

  const filteredEvents = selectedCategory ? events.filter((item) => item.category?.id === selectedCategory) : events;

  return (
    <div
      className="container-fluid py-5 wow animate__animated animate__fadeInUp"
      data-wow-delay="0.1s"
    >
      <div style={{ background: "#eee" }} className="container">
        <div className="row g-5">
          <div className="col-lg-12">
            <div className="section-title mb-4">
              <h5
                style={{ fontSize: "50px", marginBottom: "20px" }}
                className="position-relative text-center text-primary text-uppercase"
              >
                Sự kiện
              </h5>
              <div className="text-center">
                <button
                  onClick={handleShowAll}
                  className={`btn mx-1 ${!selectedCategory ? "btn-primary" : "btn-secondary"}`}
                >
                  Tất cả
                </button>
                {categories.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleCategoryClick(item.id)}
                    className={`btn mx-1 ${selectedCategory === item.id ? "btn-primary" : "btn-secondary"}`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((item) => (
              <div className="col-md-3 mb-4" key={item.id}>
                <Link to={`/event-detail/${item.id}`} className="text-decoration-none">
                  <div className="card h-100 mx-auto wow zoomIn bg-white dark:bg-gray-800 dark:border-gray-700" data-wow-delay="0.9s" style={{ border: '1px solid #ddd', borderRadius: '5px', overflow: 'hidden' }}>
                    <img src={item.image} alt={item.name} className="card-img-top" style={{ objectFit: 'cover', height: '200px' }} />
                    <div className="card-body flex-column justify-content-center align-items-center text-center">
                      <h5 className="card-title text-gray-700 dark:text-white">{item.name}</h5>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="text-center w-100" style={{ marginBottom: "20px" }}>
              Không có sự kiện nào trong danh mục này.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}