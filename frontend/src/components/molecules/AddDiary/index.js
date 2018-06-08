import React from 'react'
import { Form, Button, Input } from 'antd';
import { SelectPhoto } from '../SelectPhoto'
const FormItem = Form.Item;
const { TextArea } = Input;


class Demo extends React.Component {
  constructor(props){
    super(props)
    this.state = {photos:[]}
    this.selectPhoto = this.selectPhoto.bind(this)
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        console.log(this.state)
	      this.props.onAddDiary(values.date, values.contents, values.photos)
      }
    });
  }

  selectPhoto(event, obj) {
    let photos = this.props.photos;
    console.log("selected??######",photos)
    photos[obj.index].selected = !photos[obj.index].selected;
    console.log("select#####",photos.map(p => p.selected));
    this.setState({ photos: photos });
    console.log("state######",this.state);
  }

  pickDate = (e) => {
    if (!e || !e.target) {
      return e;
    }
    const { target } = e;
    if (target.value!=="")
      this.props.selectedDate(target.value)
    return target.value;
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    
    return (
      <Form onSubmit={this.handleSubmit}>

        <FormItem 
          {...formItemLayout}
          label="date">
          {getFieldDecorator('date', {
            getValueFromEvent: this.pickDate,
            rules: [{ required: true, message: 'Please select the date of diary!' }],
          })(<Input type="date" />)}
        </FormItem>

        <FormItem 
          {...formItemLayout}
          label="contents">
          {getFieldDecorator('contents', {
            rules: [{ required: true, message: 'Please write the contents of diary!' }],
          })(<TextArea placeholder='Please write the contents of diary!' autosize />)}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="photos">
          {getFieldDecorator('photos', {
              rules: [
                { required: false },
              ],
            })(
                <SelectPhoto photos={this.props.photos} onSelectPhoto={this.selectPhoto}/>
          )}
        </FormItem>
        <FormItem
          wrapperCol={{ span: 12, offset: 6 }}
        >
          <Button type="primary" htmlType="submit">Submit</Button>
        </FormItem>
      </Form>
    );
  }
}

export const AddDiary = Form.create()(Demo);
