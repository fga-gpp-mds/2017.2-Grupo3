import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  listSchedule: {
    flex: 1,
    marginHorizontal: 15,
    marginVertical: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: '#FAFAFA',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },

  textBox: {
    flex: 4,
    paddingLeft: 4,
    justifyContent: 'flex-start',
    marginRight: 15,
  },

  text: {
    fontSize: 15,
    paddingVertical: 2,
  },
});

class ScheduleCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }

  render() {
    return (
      <View style={styles.listSchedule} key={this.props.keyProp}>
        <View style={styles.textBox}>
          {
            this.props.data.map(item => (
              <Text style={styles.text}>
                <Text style={{ fontWeight: 'bold' }}>
                  {item.label}
                  {' '}
                </Text>
                {item.value}
              </Text>
            ))}
        </View>
        {this.props.children ? this.props.children : undefined}
      </View>
    );
  }
}

ScheduleCard.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  keyProp: PropTypes.string.isRequired,
  children: PropTypes.element,
};

ScheduleCard.defaultProps = {
  children: undefined,
};

export default ScheduleCard;
