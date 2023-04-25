import { Tab, Tabs } from 'material-ui';
import React, { useState } from 'react';

function MyTabs(): JSX.Element {
  const [value, setValue] = useState<number>(0);

  const handleChange = (
    value: any,
    event: React.FormEvent<HTMLDivElement>,
    tab: Tab
  ) => {
    setValue(tab.props.value);
  };

  return (
    <Tabs value={value} onChange={handleChange}>
      <Tab label="Tab 1" value={0} />
      <Tab label="Tab 2" value={1} />
      <Tab label="Tab 3" value={2} />
    </Tabs>
  );
}

export default MyTabs;
