import $ from 'jquery'
import React from 'react';
import styles from './index.less';
import { HistoryItem } from './components/historyItem';
import { ClassTag } from './components/classTag';
import {  Row, Col, Timeline, Icon, Tag  } from 'antd'

const Learning = React.createClass({
    componentDidMount: function(){
        var User = JSON.parse(localStorage.User); 
        var getHistoryData = this._historyChange;
        var getRecommendData = this._recommendChange;
        var getHotSearchData = this._hotSearchChange;
        $.ajax({
            type: "post",
            // url: "http://127.0.0.1:8888/midwayIsland/data",
            url: "http://192.168.100.192:8888/midwayIsland/data",
            dataType: "JSON",
            data: "type=history",
            success: function(data){
                    console.log(data);
                if(data.code==200){
                    getHistoryData(data.data.history);
                }
            },
        });
        $.ajax({
            type: "post",
            // url: "http://183.246.18.202:9018/elpcon/viewrecommendcourse",
            // url: "http://127.0.0.1:8888/midwayIsland/data",
            url: "http://192.168.100.192:8888/midwayIsland/data",
            dataType: "JSON",
            // data: "userId="+User.objectId,
            data: "type=recommend",
            success: function(data){
                    console.log(data);
                if(data.code==200){
                    // getRecommendData(data.data);
                    getRecommendData(data.data.recommend);
                }
            },
        });
        $.ajax({
            type: "post",
            // url: "http://127.0.0.1:8888/midwayIsland/data",
            url: "http://192.168.100.192:8888/midwayIsland/data",
            dataType: "JSON",
            data: "type=hotsearch",
            success: function(data){
                    console.log(data);
                if(data.code==200){
                    getHotSearchData(data.data.hotSearch);
                }
            },
        });
    },
    getInitialState: function(){
        return { 
            recommendData: [],
            hotSearchData: [],
            historyData: [],
        };
    },
    _historyChange: function(data){
        this.setState({historyData:data});
    },
    _recommendChange: function(data){
        this.setState({recommendData:data});
    },
    _hotSearchChange: function(data){
        this.setState({hotSearchData:data});
    },
    render: function Learning(){

        var HistoryList = this.state.historyData.map(function(history){
            return(
                <HistoryItem data={history}/>
            );
        });

        var recommendTagList = this.state.recommendData.map(function(recommend){
            return(
                <ClassTag data={recommend}  color="yellow" />
            );
        });

        var hotSearchTagList = this.state.hotSearchData.map(function(hotSearchItem){
            return(
                <ClassTag data={hotSearchItem} color="blue" />
            );
        });

        return (
            <Row type="flex" justify="center" align="top" id="learningBox" className="page_content">
                <Col id="history" className="page_content_left">
                    <Timeline className="timeLine">
                        { HistoryList }
                        <Timeline.Item className="end"><center>没有了哦~~~~( •̀ ω •́ )✧</center></Timeline.Item>
                    </Timeline>
                </Col>
                <Col id="hot" className="page_content_right">
                    <Col className="hotClasses">
                        <Row className="title">
                            <center><span>为你推荐</span></center>
                        </Row>
                        <Row type="flex" justify="center">
                            { recommendTagList }
                        </Row>
                    </Col>
                    <Col className="hotClasses">
                        <Row className="title">
                            <center><span>热搜词</span></center>
                        </Row>
                        <Row type="flex" justify="center">
                            { hotSearchTagList }
                        </Row>
                    </Col>
                    <Col className="infoBox">
                        <span>Zero团队 · </span>
                        <span>隐私条例 · </span>
                        <span>© 2017 ELP</span>
                    </Col>
                </Col>
            </Row>
        );
    }
});

export { Learning };
