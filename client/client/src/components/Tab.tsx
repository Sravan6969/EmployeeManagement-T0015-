import { Tab, TabList, TabPanel, TabPanels } from '@chakra-ui/react';
import React, { useState } from 'react';

function MyTabs(): JSX.Element {
  const [value, setValue] = useState<number>(0);

  // const handleChange = (
  //   value: any,
  //   event: React.FormEvent<HTMLDivElement>,
  //   tab: Tab
  // ) => {
  //   setValue(tab.props.value);
  // };

  return (
    <Tab>
    <TabList>
      <Tab>One</Tab>
      <Tab>Two</Tab>
      <Tab>Three</Tab>
    </TabList>
  
    <TabPanels>
      <TabPanel>
        <p>one!</p>
      </TabPanel>
      <TabPanel>
        <p>two!</p>
      </TabPanel>
      <TabPanel>
        <p>three!</p>
      </TabPanel>
    </TabPanels>
    </Tab>
  );
}

export default MyTabs;
