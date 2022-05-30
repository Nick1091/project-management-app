import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CircularProgress, Container, InputAdornment, Stack, TextField } from '@mui/material';
import useWindowDimensions, { useAppDispatch, useAppSelector } from '../../hooks';
import SearchIcon from '@mui/icons-material/Search';
import { getTasks } from '../../requests';
import { TaskSearch } from '../../types/taskTypes';
import { CardSearch } from '../../components/SearchComponents/CardSearch';
import { NoResults } from '../../components/SearchComponents/NoResults';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import searchImg from '../../assets/img/search.png';
import { LazyImgContainer, SearchCategory, SearchCategoryContainer, SearchText } from './styled';
import { saveSearchValue } from '../../store/searchSlice';
import { size } from '../../constants';

export const Search = () => {
  const { t } = useTranslation(['search']);
  const searchRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();
  const { isLoading, error, tasks, searchValue } = useAppSelector((state) => state.tasksState);
  const {
    authUser: { token },
  } = useAppSelector((state) => state.authUser);
  const [titleTasks, setTitleTasks] = useState<TaskSearch[]>([]);
  const [descrTasks, setDescrsTasks] = useState<TaskSearch[]>([]);
  const [nameTasks, setNameTasks] = useState<TaskSearch[]>([]);
  const titles: TaskSearch[] = [];
  const descrs: TaskSearch[] = [];
  const names: TaskSearch[] = [];
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (token) dispatch(getTasks(token));
    dispatch(saveSearchValue(''));
  }, [dispatch, token]);

  if (isLoading)
    return (
      <Stack alignItems="center" sx={{ pt: '15vh' }}>
        <CircularProgress />
      </Stack>
    );
  if (error) return <h3>{error}</h3>;

  const filterTasks = (searchText: string) => {
    tasks.forEach((item) => {
      if (item.title.indexOf(searchText) !== -1) {
        titles.push(item);
      }
      if (item.description.indexOf(searchText) !== -1) {
        descrs.push(item);
      }
      if (item.user.name.indexOf(searchText) !== -1) {
        names.push(item);
      }
    });
    setTitleTasks(titles);
    setDescrsTasks(descrs);
    setNameTasks(names);
  };

  const handleSubmit = (event: React.MouseEvent<HTMLFormElement>) => {
    setTitleTasks([]);
    setDescrsTasks([]);
    setNameTasks([]);
    event.preventDefault();
    const searchText = searchRef.current?.value ? searchRef.current?.value : '';
    filterTasks(searchText);
    dispatch(saveSearchValue(searchText));
  };

  return (
    <Container sx={{ pt: '5vh' }} maxWidth={false}>
      <SearchText>{t('GlobalSearch')}:</SearchText>
      <form onSubmit={handleSubmit}>
        <Container maxWidth="sm" sx={{ mb: '20px' }}>
          <TextField
            type="search"
            variant="outlined"
            margin="normal"
            inputRef={searchRef}
            placeholder={t('EnterSearchValue')}
            autoFocus={true}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Container>
      </form>
      {searchValue === '' ? (
        <LazyImgContainer>
          {width >= size.tablet && <LazyLoadImage effect="blur" src={searchImg} />}
          {width >= size.mobileL && width < size.tablet && (
            <LazyLoadImage effect="blur" height={390} width={400} src={searchImg} />
          )}
          {width >= size.mobileS && width < size.mobileL && (
            <LazyLoadImage effect="blur" height={290} width={280} src={searchImg} />
          )}
        </LazyImgContainer>
      ) : (
        <>
          <SearchCategory>{t('ByTitle')}</SearchCategory>
          {searchRef.current?.value === '' ||
          searchRef.current == null ||
          titleTasks.length === 0 ? (
            <NoResults />
          ) : (
            <SearchCategoryContainer>
              {titleTasks.length !== 0 &&
                titleTasks.map((task) => (
                  <CardSearch
                    key={task.id}
                    title={task.title}
                    description={task.description}
                    name={task.user.name}
                    boardId={task.boardId}
                  />
                ))}
            </SearchCategoryContainer>
          )}
          <SearchCategory>{t('ByDescription')}</SearchCategory>
          {searchRef.current?.value === '' ||
          searchRef.current == null ||
          descrTasks.length === 0 ? (
            <NoResults />
          ) : (
            <SearchCategoryContainer>
              {descrTasks.length !== 0 &&
                descrTasks.map((task) => (
                  <CardSearch
                    key={task.id}
                    title={task.title}
                    description={task.description}
                    name={task.user.name}
                    boardId={task.boardId}
                  />
                ))}
            </SearchCategoryContainer>
          )}
          <SearchCategory>{t('ByName')}</SearchCategory>
          {searchRef.current?.value === '' ||
          searchRef.current == null ||
          nameTasks.length === 0 ? (
            <NoResults />
          ) : (
            <SearchCategoryContainer>
              {nameTasks.length !== 0 &&
                nameTasks.map((task) => (
                  <CardSearch
                    key={task.id}
                    title={task.title}
                    description={task.description}
                    name={task.user.name}
                    boardId={task.boardId}
                  />
                ))}
            </SearchCategoryContainer>
          )}
        </>
      )}
    </Container>
  );
};
