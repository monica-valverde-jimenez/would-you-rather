const getMenuLinks = () => {
  return {
    home: '/',
    newQuestion: '/add',
    leaderBoard: '/leaderboard',
    poll: '/questions/:question_id',
    pageNotFound: '/404'
  };
};
export default getMenuLinks;