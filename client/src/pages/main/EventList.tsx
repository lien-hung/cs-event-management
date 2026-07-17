import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getCategory } from "../../store/categorySlice";
import { getEvent } from "../../store/eventSlice";

export function EventList() {
  const dispatch = useAppDispatch();
  const events = useAppSelector((state) => state.event.events);
  const categories = useAppSelector((state) => state.category.categories);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredEvents =
    selectedCategory === "All"
      ? events
      : events.filter((item) => item.category?.id === Number(selectedCategory));

  useEffect(() => {
    dispatch(getEvent());
    dispatch(getCategory());
  }, [dispatch]);

  return (
    <div className="container-fluid pt-36 wow fadeInUp" data-wow-delay="0.1s">
      <div className="container">
        <div className="row">
          <div className="col-lg-5">
            <div className="section-title">
              <h5 className="position-relative d-inline-block text-primary text-uppercase">
                Danh Mục Sự Kiện
              </h5>
            </div>
            <div className="col-lg-10 my-4 flex ">
              <h5 className="mr-3 mt-2">Tùy Chọn: </h5>
              <div className="w-72">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="form-select"
                >
                  <option value="All">Tất cả</option>
                  {categories.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full grid grid-cols-4">
          {filteredEvents.length > 0 &&
            filteredEvents?.map((item) => {
              return (
                <div key={item.id}>
                  <Link to={`/event-detail/${item.id}`}>
                    <div
                      className="max-w-sm mb-5 wow zoomIn bg-white dark:bg-gray-800 dark:border-gray-700"
                      data-wow-delay="0.9s"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="rounded-sm shadow-md border border-gray-200"
                      />

                      <div className="p-4 text-lg font-normal text-center">
                        {item.name}
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}