import Skeleton from 'react-loading-skeleton';

import { UIList, UIListItem } from '.';
import { UICard } from './ui-card';
import { UIHeading } from './ui-heading';

export function UICardSkeleton() {
  return (
    <UICard>
      <UIHeading>
        <Skeleton height="1.75rem" width="25%" />
      </UIHeading>
      <UIHeading as="h2">
        <Skeleton height="1.75rem" width="15%" />
      </UIHeading>
      <UIList>
        <UIListItem>
          <Skeleton height="1.75rem" width={'27%'} />
        </UIListItem>
        <UIListItem>
          <Skeleton height="1.75rem" width={'33%'} />
        </UIListItem>
        <UIListItem>
          <Skeleton height="1.75rem" width={'39%'} />
        </UIListItem>
        <UIListItem>
          <Skeleton height="1.75rem" width={'18%'} />
        </UIListItem>
        <UIListItem>
          <Skeleton height="1.75rem" width={'43%'} />
        </UIListItem>
      </UIList>
    </UICard>
  );
}
