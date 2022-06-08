import { useTranslation } from 'react-i18next';
import { SearchCategoryContainer } from '../../../pages/Search/styled';
import { SearchItem } from './styled';

export const NoResults = () => {
  const { t } = useTranslation(['search']);

  return (
    <SearchCategoryContainer>
      <SearchItem>{t('NoResults')}</SearchItem>
    </SearchCategoryContainer>
  );
};
