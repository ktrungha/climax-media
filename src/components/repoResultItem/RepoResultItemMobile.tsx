import * as React from 'react';
import { RepoResultItemProps } from '.';
import { Card, Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import styled from '@emotion/styled'

const NumberDiv = styled.div`
  width: 100px;
`;

const Row = styled.div`
  margin-bottom: 15px;
  padding: 0 10px;
  :last-child {
    margin-bottom: 0;
  };
`;

const Layout: React.FC<{
  owner: React.ReactNode,
  stars: React.ReactNode,
  forks: React.ReactNode,
  name: React.ReactNode
}> = props => {
  const { owner, stars, forks, name } = props;
  return <div style={{ padding: '10px' }}>
    <Row style={{ overflow: 'hidden' }}>
      {owner}
    </Row>
    <Row style={{ display: 'flex' }}>
      <NumberDiv style={{ flex: 1 }}>
        {
          stars
        }
      </NumberDiv>
      <NumberDiv style={{ flex: 1 }}>
        {
          forks
        }
      </NumberDiv>
    </Row>
    <Row style={{ overflow: 'hidden' }}>
      {
        name
      }
    </Row>
  </div>
}

const RepoResultItemMobile: React.FunctionComponent<RepoResultItemProps> = (props) => {
  const { data } = props;
  return <Card style={{ borderRadius: '8px' }} elevation={2} role='listitem'>
    {
      data ?
        <Layout
          owner={<Typography noWrap variant="h6">{data.owner.login}</Typography>}
          stars={<Typography variant="subtitle2">Stars: {data.stargazers_count}</Typography>}
          forks={<Typography variant="subtitle2">Forks: {data.forks}</Typography>}
          name={<Typography noWrap variant="h6">{data.name}</Typography>}
        />
        :
        <Layout
          owner={<Skeleton width="90px" />}
          stars={<Skeleton width="50px" />}
          forks={<Skeleton width="50px" />}
          name={<Skeleton width="150px" />}
        />
    }
  </Card>;
}

export default RepoResultItemMobile;
