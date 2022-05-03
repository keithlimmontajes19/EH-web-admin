import styled from 'styled-components';
import { Layout } from 'antd';

export const Container = styled.div`

width:100%;
height:353px;
display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    align-content: space-around;
    align-items: center;
    justify-content: space-evenly;
  
/* Hub Blurple */
background: #e0dffe;
box-shadow: 0px 5px 20px -5px rgba(43, 46, 74, 0.2);
border-radius: 15px;

`;

export const Img = styled.img`
    width:153px;
`
export const IconImg = styled.img`
    width:30px;
`
export const RootContainer = styled.div`
    // display:flex;
    // justify-content:space-evenly;
    .ant-layout{ 
        background: none !important;
        padding-left:15px;
    }
`
export const Title = styled.h2`
font-family: 'Red Hat Display';
font-style: normal;
font-weight: 700;
font-size: 22px;
line-height: 28px;
color:#8586a4;
`
export const ListTitle = styled.h3`
font-family: 'Red Hat Display';
font-style: normal;
font-weight: 600;
font-size: 22px;
line-height: 28px;
opacity: 0.8;
`
export const ViewIcon = styled.img`
    width:20px;
    margin-right:14px;
`
export const DotIcon = styled.img` 
width:5px;
margin:0px 14px;
`
export const StatusDot = styled.img`
    width:16px;
    margin-right:10px;
`
export const Br = styled.br`
position: absolute;
width: 687px;
height: 0px;
left: 259px;
top: 711px;

opacity: 0.1;
/* Hub Blurple */

border: 2px solid #635FFA;
`
export const RecentBody = styled.div`
    padding:30px
`

export const TableCell = styled.div`
    margin-bottom:0px;
    margin-right:0px;
    display:flex;
    flex-direction:row;
    justify-content: flex-start;
    align-items: center;


`
export const TableContainer: any = styled(Layout)`

@media screen and (max-width:1920px)
{
    .ant-table-cell {
        // background: #e0dffe;
        padding:16px !important;
    }
}
@media screen and (max-width:1440px)
{
    .ant-table-cell {
        // background: #e0dffe;
        padding:8px !important;
    }
}
.ant-table {
    
    border-radius:15px;
}
.ant-table-thead > tr > th:first-child {
    color: #635FFA !important ;
    font-size: 22px;
    font-weight: bold;
    background: #ffff;
}


.ant-table-thead > tr > th{
    font-size: 16px;
    background: #ffff;
}
.ant-table-cell {
    // background: #e0dffe;
    padding:8px;
}
.ant-table-head > tr > th > h3 {
    width:70%
}
ul.ant-pagination.ant-table-pagination.ant-table-pagination-right {
    display: none;
}

`
export const TabContainer: any = styled(Layout)`
.ant-tabs{
    background:none;
}
.ant-tabs-tab-btn:active, .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color:#635ffa;
    border-radius: 15px;
    background: #e0dffe;
    padding: 10px;
    font-weight: bold;
}
.ant-tabs-ink-bar {
    position: absolute;
    background: transparent;
    pointer-events: none;
}


.ant-layout*{ 
    background: none !important;
    padding-left:15px;
}
`