import { Searchbar } from './Searchbar/Searchbar';
import { useEffect, useState } from 'react';
import { PixabayApi } from 'api/photos';
import { ImageGallery } from './ImageGallery/ImageGallery';
import css from './App.module.css';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import Notiflix from 'notiflix';

export const App = () => {
  const [query, setQuery] = useState('');
  const [hits, setHits] = useState([]);
  const [showBtn, setShowBtn] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (query) {
      setShowBtn(false);
      setLoading(true);

      PixabayApi(page, query)
        .then(({ data }) => {
          if (query && page === 1) {
            Notiflix.Notify.success(
              `Found for your request ${data.totalHits} picture`
            );
          }

          setHits(prev => [...prev, ...data.hits]);
          setShowBtn(true);
          setLoading(false);

          if (page >= data.totalHits / 12) setShowBtn(false);
        })
        .catch(error => Notiflix.Notify.warning(error));
    }
  }, [page, query]);

  const loadMore = () => {
    setShowBtn(false);
    setLoading(true);
    setPage(prev => prev + 1);
  };

  const onSubmit = query => {
    setQuery(query);
    setHits([]);
    setPage(1);
  };
  return (
    <div className={css.app}>
      <Searchbar onSubmit={onSubmit} />
      {hits && <ImageGallery data={hits} />}
      {showBtn && <Button loadMore={loadMore} />}
      {loading && <Loader />}
    </div>
  );
};
