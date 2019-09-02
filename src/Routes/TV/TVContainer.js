import React from 'react';
import TVPresenter from './TVPresenter';
import { tvApi } from 'api';

export default class extends React.Component {
  state = {
    airingToday: null,
    popular: null,
    topRated: null,
    error: null,
    loading: true,
  };

  componentDidMount = async () => {
    try {
      const {
        data: { results: airingToday },
      } = await tvApi.airingToday();
      const {
        data: { results: popular },
      } = await tvApi.popular();
      const {
        data: { results: topRated },
      } = await tvApi.topRated();
      // throw Error();
      this.setState({
        airingToday,
        popular,
        topRated,
      });
    } catch {
      this.setState({ error: "Can't find movies information." });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { airingToday, popular, topRated, error, loading } = this.state;
    console.log(this.state);
    return (
      <TVPresenter
        airingToday={airingToday}
        popular={popular}
        topRated={topRated}
        error={error}
        loading={loading}
      />
    );
  }
}
