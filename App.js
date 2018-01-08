import React, { Component } from 'react'
import { AppRegistry, StyleSheet, View, Text } from 'react-native'
export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.drawPie = this.drawPie.bind(this)
    this.initData = this.initData.bind(this)
    this.state = {
      // pieSize[i] : size of ith pie, piePos[i] : starting position of ith pie;
      // 2차원배열 잘모르겠어서 이렇게만듦
      pieSize: [],
      piePos: []
    }
  }
  // initData!!
  componentDidMount () {
    this.initData(this.props.data)
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.data !== this.props.data) {
      this.initData(nextProps.data)
    }
  }
  //
  initData (data) {
    // validation or default props setting
    let sum = 0
    for (let i = 0; i < data.length; i++) {
      sum += data[i]
    }
    let pieSize = data.map((v) => {
      return v / sum * 2 * Math.PI
    })
    let piePos = []
    piePos[0] = 0
    for (let i = 1; i < data.length; i++) {
      piePos[i] = piePos[i - 1] + pieSize[i - 1]
    }
    this.setState({
      pieSize: pieSize,
      piePos: piePos
    }, () => {
      console.log('!!', this.state.piePos)
      console.log('@@', this.state.pieSize)
    })
  }
  drawTest (angle, color) {
    return (
      <View style={{
        // ##위치 정해야함
        width: 100 + Math.sin(angle) * 100,
        height: (1 - Math.cos(angle)) * 100,
        borderWidth: 0,
        borderColor: '#00AA00'
      }}>
        <View style={{}}>
          {
              // 사각형 그릴 공간 여기에 .parent {overflow: hidden}을 넣을 것
          }
          {(console.log('test2'))}
          <View style={[styles.circle, {
            backgroundColor: color
          }]} />
          <View style={{
            // 덮어씨우는 정사각형 반은 투명 반은 흰색
            flexDirection: 'row',
            width: 200,
            height: 200,
            transform: [{ rotate: `${angle}rad` }]
          }}>
            {(console.log('test3', angle))}
            <View style={{
              width: 100,
              height: 200,
              backgroundColor: 'transparent'
            }} />
            <View style={{
              width: 100,
              height: 200,
              backgroundColor: 'white'
            }} />
            {(console.log('test4'))}
          </View>
        </View>
      </View>
    )
  }
  drawPie (angle, color) {
    (console.log('testStart'))
    // angle: 0 ~ 2PI
    return (
      <View>
        {angle > 1 / 2 * Math.PI ? (
          <View style={{position: 'relative'}}>
            {this.drawPie(1 / 2 * Math.PI, color)}
            {(console.log('test'))}
            <View style={{

              position: 'absolute',
              transform: [{ rotate: `${1 / 2 * Math.PI}rad` }]
            }}>
              {this.drawPie(angle - 1 / 2 * Math.PI, color)}
            </View>
          </View>
        ) : (
          // 예각인 파이를 그릴 공간
          <View style={{
            position: 'relative',
            width: 200,
            height: 200
          }}>
            {(console.log('test'))}
            <View style={{
              width: Math.sin(angle) * 100,
              position: 'relative',
              marginLeft: 100,
              overflow: 'hidden',
              borderColor: '#AA0000',
              borderWidth: 0,
              height: (1 - Math.cos(angle)) * 100
            }}>
              <View style={{left: -100}}>
                {this.drawTest(angle, color)}
              </View>
            </View>
            <View style={{
              // right triangle
              width: 0,
              height: 0,
              left: 100,
              borderBottomWidth: Math.cos(angle) * 100,
              borderBottomColor: 'transparent',
              borderLeftWidth: Math.sin(angle) * 100,
              borderLeftColor: color
            }} />
            {(console.log('test5'))}
          </View>
          )}
      </View>
    )
  }
  drawT () {
    let pies = []
    if (this.state.pieSize.length === 0) return null
    for (let i = 0; i < this.state.pieSize.length; i++) {
      
        pies.push(
          <View key={`t${i}`} style={{
            transform: [{ rotate: `${this.state.piePos[i]}rad` }],
            position: 'absolute'
          }}>
            {this.drawPie(this.state.pieSize[i], this.props.colors[i])
            }
          </View>
        )
      
    }
    return (
      pies
    )
  }
  render () {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        { this.drawT()}
      </View>
    )
  }
}
App.defaultProps = {
  data: [10, 20, 50, 30],
  colors: ['red', 'blue', 'green', 'yellow']
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  // 반지름이 100인 원
  circle: {
    width: 200,
    position: 'absolute',
    height: 200,
    borderRadius: 100
  },
  // 정사각형을 반토막낸 직사각형
  rectangle: {
    width: 100,
    height: 200,
    left: 0,
    position: 'absolute',
    backgroundColor: 'transparent'
  },
  // 우반원
  rightHalfCircle: {
    width: 100,
    height: 200,
    left: 100,
    position: 'absolute',
    borderBottomRightRadius: 200,
    borderTopRightRadius: 200
  }
})
