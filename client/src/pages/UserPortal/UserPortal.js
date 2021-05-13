import React, { useState } from 'react';
import style from './UserPortal.module.css';
import { ImUserPlus } from 'react-icons/im';
import { Form, Button } from 'bootstrap-4-react';
import axios from '../../utils/axios';
import useInput from '../../utils/useInput';
import { useForm } from 'react-hook-form';

const UserPortal = ({ user, ...props }) => {
    const [message, setMessage] = useState('');
    const [transferAmount, setTransferAmount] = useInput('');
    const {
        register,
        // handleSubmit,
        // watch,
        formState: { errors },
    } = useForm();

    console.log('transferAmount', transferAmount);

    const onSubmit = async (e) => {
        e.preventDefault();
        const { data } = await axios.post('/api/deposits/transfer', {
            id: user._id,
            transferAmount: +transferAmount,
        });
        setMessage(data.message);
        console.log('responseDB', data);
        setTimeout(() => {
            props.history.go(0);
        }, 3000);
    };

    return (
        <div className={style.UserPortal}>
            <header>
                <div className={style.Logo}>
                    <img
                        src="assets/africa-recycle-logo.png"
                        alt="recycle-logo"
                    />
                    <h1>!</h1>
                </div>
                {props.width > '600' && (
                    <p
                        style={{
                            marginRight: '15%',
                        }}
                    >
                        It's all about what you do for our future...{' '}
                    </p>
                )}
            </header>
            <section className={style.Showcase}>
                <div
                    className={style.Row}
                    style={{
                        alignItems: 'center',
                        marginTop: '5%',
                        marginBottom: '7%',
                    }}
                >
                    <h3 style={{ color: '#eee' }}>
                        {user.firstName} {user.lastName}
                    </h3>
                    <div className={style.Avatar}>
                        {user?.avatar ? (
                            <img src={user.avatar} alt="user-avatar" />
                        ) : (
                            <h1
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: '2.5rem',
                                }}
                            >
                                <ImUserPlus />
                            </h1>
                        )}
                    </div>
                </div>
                <div className={style.Values}>
                    <div className={style.Row}>
                        <label htmlFor="right">Current Balance</label>
                        <div className={style.Display}>
                            {`${user.balance.toFixed(2)} $`}
                        </div>
                    </div>

                    <div className={style.Row}>
                        <label htmlFor="left">Total Recycled</label>
                        <div className={style.Display}>
                            {`${user.totalRecycled.toFixed(2)} Kg`}
                        </div>
                    </div>

                    <div className={style.Row}>
                        <label htmlFor="left">Total Earnings</label>
                        <div className={style.Display}>
                            {`${user.totalEarned.toFixed(2)} $`}
                        </div>
                    </div>
                </div>
            </section>
            <section className={style.Inputcase}>
                <Form onSubmit={onSubmit} className={style.Form}>
                    <Form.Group
                        className={style.Row}
                        style={{ alignItems: 'flex-end', marginTop: '5%' }}
                    >
                        <label htmlFor="amount">Cash Transfer</label>

                        <div
                            style={{ display: 'flex', alignItems: 'flex-end' }}
                        >
                            <span
                                style={{
                                    marginRight: '5%',
                                    fontSize: '1.2rem',
                                }}
                            >
                                $
                            </span>
                            <Form.Input
                                {...register('amount', {
                                    required: false,
                                    maxLength: 3,
                                })}
                                className={style.Display}
                                value={transferAmount}
                                placeholder={'$$$'}
                                onChange={setTransferAmount}
                            />
                            <span style={{ marginLeft: '3%' }}>,00</span>
                        </div>
                    </Form.Group>
                    <p style={{ color: '#fff', fontSize: '1rem' }}>{message}</p>
                    {errors.amount && <span>Max withdraw 999 $</span>}
                    <Button type="submit" disabled as={!transferAmount}>
                        <img
                            src="assets/transferwise-logo.png"
                            alt="transferwise-logo"
                        />
                    </Button>
                </Form>
            </section>
        </div>
    );
};

export default UserPortal;
