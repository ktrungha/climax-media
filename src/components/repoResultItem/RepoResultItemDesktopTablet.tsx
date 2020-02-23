import { Card, Typography } from '@material-ui/core';
import * as React from 'react';
import { RepoResultItemProps } from '.';
import Skeleton from '@material-ui/lab/Skeleton';
import styled from '@emotion/styled'

const NumberDiv = styled.div`
  padding: 15px;
  width: 100px;
`;

const Layout: React.FC<{
  owner: React.ReactNode,
  ownerAvatar: React.ReactNode,
  stars: React.ReactNode,
  forks: React.ReactNode,
  description: React.ReactNode,
  name: React.ReactNode
}> = props => {
  const { owner, ownerAvatar, stars, forks, name, description } = props;
  return <div>
    <div style={{ display: 'flex', alignItems: 'center', padding: '30px' }}>
      <div style={{ width: '100px' }}>
        {
          ownerAvatar
        }
      </div>
      <div style={{ flex: 1, padding: '15px' }}>
        {
          owner
        }
      </div>
      <NumberDiv>
        {
          stars
        }
      </NumberDiv>
      <NumberDiv>
        {
          forks
        }
      </NumberDiv>
    </div>
    <div style={{ padding: '0 30px 30px 30px' }}>
      <div style={{ padding: '10px 0' }}>
        {
          name
        }
      </div>
      <div>
        {
          description
        }
      </div>
    </div>
  </div>
}

const RepoResultItemDesktopTablet: React.FunctionComponent<RepoResultItemProps> = (props) => {
  const { data } = props;
  return <Card style={{ borderRadius: '8px' }} elevation={2} role="listitem">
    {
      data ?
        <Layout
          owner={<Typography variant="h4">{data.owner.login}</Typography>}
          ownerAvatar={<img alt='avatar' src={data.owner.avatar_url} style={{ width: '70px', height: '70px' }} />}
          stars={<Typography variant="subtitle1">Stars: {data.stargazers_count}</Typography>}
          forks={<Typography variant="subtitle1">Forks: {data.forks}</Typography>}
          name={<Typography variant="h5">{data.name}</Typography>}
          description={<Typography>{data.description}</Typography>}
        />
        :
        <Layout
          owner={<Skeleton width="90px" />}
          ownerAvatar={<Skeleton variant='rect' width='70px' height="70px" />}
          stars={<Skeleton width="90px" />}
          forks={<Skeleton width="90px" />}
          name={<Skeleton width="150px" />}
          description={<>
            <Skeleton />
            <Skeleton />
          </>}
        />
    }
  </Card>;
};

export default RepoResultItemDesktopTablet;
