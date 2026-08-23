import Content from '@theme-original/DocSidebar/Desktop/Content';
import GithubCard from '@site/src/components/GithubCard';

export default function ContentWrapper(props) {
  return (
    <>
      <Content {...props} />
      <GithubCard />
    </>
  );
}
