import { Menu, Container, Icon } from 'semantic-ui-react';
import Link from 'next/link';

import Router, { useRouter } from 'next/router';
import NProgress from 'nprogress';

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

const pages = [
  {
    title: 'My Calendar',
    route: '/',
    icon: () => (
      <Icon
        name="calendar"
        size="large"
      />
    )
  },
  {
    title: 'Create Event',
    route: '/eventForm',
    icon: () => (
      <Icon
        name="plus circle"
        size="large"
      />
    )
  }
];

function Header() {
  const router = useRouter();

  function isActive(route) {
    return route === router.pathname;
  }

  return (
    <Menu id="menu" inverted>
      <Container text>
        {pages.map(((p, i) => {
          return (
            <Link key={i} href={p.route}>
              <Menu.Item header active={isActive(p.route)}>             
                {p.icon()}
                {p.title}
              </Menu.Item>
            </Link>
          );          
        }))}
      </Container>
    </Menu>  
  );
}

export default Header;
