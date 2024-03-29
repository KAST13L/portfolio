import React, {useState} from 'react';
import styles from './Contacts.module.scss'
import {Title} from "../../common/title/Title";
import {Links} from "../header/links/Links";
import {ContactsComponentType} from "../../app/state";
import {useForm} from "react-hook-form";
import axios from "axios";
import {SnackBar} from "../SnackBar/SnackBar";

type ContactsPropsType = {
    contactsComponent: ContactsComponentType
}

export function Contacts(props: ContactsPropsType) {

    const {contactsComponent} = props

    const {register, handleSubmit, formState: {errors}, ...form} = useForm({
        defaultValues: {
            name: '',
            email: '',
            message: ''
        },
        mode: 'onTouched'
    });

    const [status, setStatus] = useState<'loading' | 'error' | 'success' | 'idle'>('idle')

    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    const onSubmit = async (data: any) => {
        setStatus('loading')
        try {
            const res = await axios.post('https://gmail-nodejs-xkaz-k28hw8pi7-kast13l.vercel.app/sendMessage', data)
            if (res) {
            }
            setSuccess('Message is sending! Thank you! Ти солоденький пиріжечок❤!!')
            form.reset();
        } catch (e) {
            setError(String(e))
        } finally {
            setStatus("success")
        }
    }

    return (
        <div className={styles.contactsBlock} id={'contacts'}>
            <div className={styles.contactsContainer}>
                <Title h2={contactsComponent.title}/>
                <div className={styles.formInfo}>
                    <div className={styles.info}>
                        <p className={styles.text}>{contactsComponent.p}</p>
                        <h3>{}</h3>
                        <h3>{contactsComponent.h3}</h3>
                        <p className={styles.tel}><a
                            style={{textDecoration: 'none', color: 'black'}}
                            href="tel:+380633953746">{contactsComponent.callLife}</a></p>
                        <p className={styles.tel}><a
                            style={{textDecoration: 'none', color: 'black'}}
                            href="tel:+380508791762">{contactsComponent.callVodafone}</a>
                        </p>
                        <div>
                            <Links links={contactsComponent.contactsLinks}/>
                        </div>
                    </div>

                    <SnackBar error={error} success={success} setError={setError}
                              setSuccess={setSuccess}/>
                    <div className={styles.form}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label>{contactsComponent.name} {errors.name &&
                                    <span style={{
                                        height: '1px',
                                        color: 'red'
                                    }}>{errors.name.message}</span>}</label>
                                <input {...register("name", {
                                    required: contactsComponent.formError.nameError
                                })} />
                            </div>
                            <div>
                                <label>{contactsComponent.email} {errors.email &&
                                    <span style={{
                                        height: '1px',
                                        color: 'red'
                                    }}>{errors.email.message}</span>}</label>
                                <input {...register('email', {
                                    required: contactsComponent.formError.emailError,
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                        message: contactsComponent.formError.emailIncorrect
                                    }
                                })}/>
                            </div>
                            <div>
                                <label>{contactsComponent.formMessage} {errors.message &&
                                    <span style={{
                                        height: '1px',
                                        color: 'red'
                                    }}>{errors.message.message}</span>}</label>
                                <textarea {...register("message", {
                                    required: contactsComponent.formError.messageError
                                })} ></textarea>
                            </div>
                            <div>
                                <button disabled={status === 'loading'} type={'submit'}>
                                    {
                                        errors.email || errors.name || errors.message
                                            ? <span
                                                style={{color: 'red'}}>{contactsComponent.formError.buttonError}</span>
                                            : status === 'loading'
                                                ? <span
                                                    style={{color: 'green'}}>{contactsComponent.formError.loading}</span>
                                                : contactsComponent.button + ' ▶ '
                                    }
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}


