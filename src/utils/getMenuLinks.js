const getMenuLinks = () => {
  return {
    home: '/',
    newQuestion: '/add',
    leaderBoard: '/leaderboard',
    poll: '/questions/:question_id'
  };
};
export default getMenuLinks;