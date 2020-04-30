function mySettings(props) {
    return (
      <Page>
        <Section>
          <Text>Simple Analog Clock Face</Text>
        </Section>
        <Section title={<Text bold align="center">Colour Settings</Text>}>
          <Text>Hour Hand</Text>
            <ColorSelect settingsKey="hour_hand_colour" colors={[
              {color: "yellow"}, 
              {color: "#ffd733"},
              {color: "orange"},
              {color: "red"},
              {color: "magenta"},
              {color: "pink"},
              {color: "plum"},
              {color: "violet"},
              {color: "purple"},
              {color: "indigo"},
              {color: "#7898f8"},
              {color: "#7090bf"},
              {color: "lavender"},
              {color: "blue"},
              {color: "cyan"},
              {color: "aqua"},
              {color: "green"},
              {color: "#67e55d"},
              {color: "#b8fc68"},
              {color: "#1b2c40"},
              {color: "#394003"},
              {color: "#134022"},
              {color: "#ffffff"},
              {color: "#a0a0a0"},
              {color: "#505050"},
              {color: "#303030"}
            ]}
           />
        <Text>Minute Hand</Text>
          <ColorSelect settingsKey="min_hand_colour" colors={[
            {color: "yellow"}, 
            {color: "#ffd733"},
            {color: "orange"},
            {color: "red"},
            {color: "magenta"},
            {color: "pink"},
            {color: "plum"},
            {color: "violet"},
            {color: "purple"},
            {color: "indigo"},
            {color: "#7898f8"},
            {color: "#7090bf"},
            {color: "lavender"},
            {color: "blue"},
            {color: "cyan"},
            {color: "aqua"},
            {color: "green"},
            {color: "#67e55d"},
            {color: "#b8fc68"},
            {color: "#1b2c40"},
            {color: "#394003"},
            {color: "#134022"},
            {color: "#ffffff"},
            {color: "#a0a0a0"},
            {color: "#505050"},
            {color: "#303030"}
          ]}
         />
       <Text>Second Hand</Text>
          <ColorSelect settingsKey="sec_hand_colour" colors={[
            {color: "yellow"}, 
            {color: "#ffd733"},
            {color: "orange"},
            {color: "red"},
            {color: "magenta"},
            {color: "pink"},
            {color: "plum"},
            {color: "violet"},
            {color: "purple"},
            {color: "indigo"},
            {color: "#7898f8"},
            {color: "#7090bf"},
            {color: "lavender"},
            {color: "blue"},
            {color: "cyan"},
            {color: "aqua"},
            {color: "green"},
            {color: "#67e55d"},
            {color: "#b8fc68"},
            {color: "#1b2c40"},
            {color: "#394003"},
            {color: "#134022"},
            {color: "#ffffff"},
            {color: "#a0a0a0"},
            {color: "#505050"},
            {color: "#303030"}
          ]}
        />
      </Section>
      </Page>
    );
  }
  
  registerSettingsPage(mySettings);